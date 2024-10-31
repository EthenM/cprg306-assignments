import { useState } from "react";


export default function MealCard({ meal }) {
    const [mealDetails, setMealDetails] = useState({})


    const getDetails = () => {
        //fetch the meal details.
        fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal.idMeal)
            .then(response => {
                if (response.ok) {                    
                    response.json()
                        .then(details => {
                            // console.dir(details);
                            filterDetails(details.meals[0])
                        })
                        .catch(err => {
                            console.log("ERROR: " + err);
                        });
                } else {
                    throw new Error("Error fetching data: ", response.text())
                }
            })
            .catch(err => {
                console.log("ERROR: ", err)
            });
    };

    const filterDetails = (details) => {

        //get the list of ingredients
        const ingredients = Object.keys(details)
            .filter(detail => details[detail] && detail
                .toLowerCase().includes("ingredient"));

        //get the list of measurements
        const measurements = Object.keys(details)
            .filter(detail => details[detail] && detail.toLowerCase()
                .includes("measure"));


        let i = 0;
        const mealDetails = ingredients.reduce((acc, currObj) => {

            if (!acc.ingredients) {
                acc.ingredients = []
            }

            //get the current ingredient
            const ingredient = details[currObj];
            //pull out the measurement from the current index.
            const measurement = Object.keys(details).length > i ? details[measurements[i]] : "";

            //push the ingredient & measurements to the list of ingredients
            acc.ingredients.push({ingredient: ingredient, measurement: measurement})

            //incement the counter by one
            i++;
            return acc;
        }, {})

        mealDetails.instructions = details.strInstructions

        // console.dir(mealDetails)

        setMealDetails(mealDetails);
    }

    return (
        <div onClick={getDetails}>
            <h3>{meal.strMeal}</h3>
            {
                Object.keys(mealDetails).length > 0 &&
                (
                    <div>
                        <h4>Ingredients:</h4>
                        <ul>
                            {
                                mealDetails?.ingredients?.map(ingredient => 
                                    <li key={ingredient.ingredient}>
                                        {ingredient.ingredient}, {ingredient.measurement}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
}
