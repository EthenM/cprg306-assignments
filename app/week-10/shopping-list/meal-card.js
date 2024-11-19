"use client"

import { useState } from "react";

/**
 * Builds and returns a meal card to render to the meal-ideas modal
 * 
 * @param {Object} param0
 * @param {Object} param0.meal The meal to render
 * @param {String} param0.selectedMealId The currently selected meal's id
 * @param {function(String)} param0.setSelectedMealId A function to set the selected meal id
 * @returns A meal card to render
 */
export default function MealCard({ meal, selectedMealId, setSelectedMealId }) {
    const [mealDetails, setMealDetails] = useState({})


    /**
     * If no details exist in the mealDetails state variable, it will fetch the meal from
     * https://www.themealdb.com/api/json/v1/1/lookup.php, with the parameter i as the meal id.
     * it will then send it off to {@link filterDetails}, where the meal will be parsed and turned into
     * a useable state and stored in mealDetails. the selectedMealId will also be set to this meal,
     * causing all other (hopefully only one) cards to close.
     * 
     * If details do exist, the mealDetails will be cleared, causing the card to "collapse".
     * The value in selectedMealId is cleared as well, as there are no selected meals.
     */
    const getDetailsOrCollapse = () => {
        
        //if details already exist, remove them.
        if (Object.keys(mealDetails).length > 0) {
            //this will cause the card to collapse
            setMealDetails({});

            //if the user collapses the current card, then no meal should be selected.
            setSelectedMealId("");
        } else {

            //the user has selected this meal, it should be set as the current.
            setSelectedMealId(meal.idMeal);

            //fetch the meal details.
            fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal.idMeal)
                .then(response => {
                    if (response.ok) {                    
                        response.json()
                            .then(details => {
                                // console.dir(details);
                                filterDetails(details.meals[0]);
                            })
                            .catch(err => {
                                console.log("ERROR: " + err);
                            });
                    } else {
                        throw new Error("Error fetching data: ", response.text());
                    }
                })
                .catch(err => {
                    console.log("ERROR: ", err);
                });
        }

    };

    /**
     * Builds the mealDetails object, by putting ingredients and measurements together,
     * and adding the instructions.
     * 
     * @param {Object} details 
     */
    const filterDetails = (details) => {

        //get the list of ingredients
        const ingredients = Object.keys(details)
            .filter(detail => details[detail] && detail.toLowerCase().includes("ingredient"));

        //get the list of measurements
        const measurements = Object.keys(details)
            .filter(detail => details[detail] && detail.toLowerCase().includes("measure"));


        let i = 0;
        const mealDetails = ingredients.reduce((acc, currObj) => {

            if (!acc.ingredients) {
                acc.ingredients = [];
            }

            //get the current ingredient
            const ingredient = details[currObj];
            //pull out the measurement from the current index.
            const measurement = Object.keys(details).length > i ? details[measurements[i]] : "";

            //push the ingredient & measurements to the list of ingredients
            acc.ingredients.push({ingredient: ingredient.trim(), measurement: measurement.trim()});

            //incement the counter by one
            i++;
            return acc;
        }, {})

        mealDetails.instructions = details.strInstructions;

        // console.dir(mealDetails)

        setMealDetails(mealDetails);
    }

    //if the selected meal is not this one, remove the details
    //this will allow the hover effect to be added back
    if (selectedMealId && selectedMealId != meal.idMeal && Object.keys(mealDetails).length > 0) {
        setMealDetails({});
    }

    //this will ensure that the hover effect is only applied to cards that have not been expanded
    const cardStyle = "border border-blue-950 rounded-md p-2 mr-10 mb-2 cursor-default " +
        (Object.keys(mealDetails).length <= 0 ? "hover:bg-slate-900" : "");

    return (
        <div onClick={getDetailsOrCollapse} className={cardStyle}>
            <h3 className="text-xl cursor-pointer hover:bg-slate-900 rounded-sm">{meal.strMeal}</h3>
            {
                Object.keys(mealDetails).length > 0 && selectedMealId == meal.idMeal &&
                (
                    <div onClick={(event) => event.stopPropagation()} className="ml-5">
                        <section className="pb-4">

                            <h4 className="text-lg">Ingredients:</h4>
                            <ul className="ml-10 list-disc">
                                {
                                    mealDetails?.ingredients?.map(ingredient => 
                                        <li key={ingredient.ingredient}>
                                            {
                                                ingredient.ingredient +
                                                
                                                (
                                                    ingredient.measurement
                                                        ? (", " + ingredient.measurement)
                                                        : ""
                                                )
                                            }
                                        </li>
                                    )
                                }
                            </ul>

                        </section>

                        {
                            mealDetails.instructions &&
                            <section>
                                <h4 className="text-lg">Instructions:</h4>
                                <p className="ml-10">{mealDetails.instructions}</p>
                            </section>
                        }
                    </div>
                )
            }
        </div>
    );
}
