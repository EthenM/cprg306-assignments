"use client"

import { useEffect, useState } from "react";
import MealCard from "./meal-card";

/**
 * The meal Ideas modal.
 * 
 * @param {Object} param0
 * @param {function()} param0.toggleVisibilityFunc toggles the visibility of the modal
 * @param {String} param0.item The item to get the meal ideas for.
 * @returns The NewItem modal to render
 */
export default function MealIdeas({ toggleVisibilityFunc, item}) {

    const [mealIdeas, setMealIdeas] = useState([]);
    const [itemName, setItemName] = useState("");
    const [selectedMealid, setSelectedMealId] = useState("");


    //TODO: might need to pass the selected item setter function into here as well,
    //to ensrue that the user can click on the same item multiple times

        //for ingredients: www.themealdb.com/api/json/v1/1/lookup.php?i=<<MEAL ID>>
        //for meals: www.themealdb.com/api/json/v1/1/list.php?i=<<INGREDIENT>>

    useEffect(() => {

        if (item != "") {

            //this will take all characters before the first comma (if any)
            //replace any non-ascii chars, and remove all leading & trailing whitespaces.
            //In other words, it prepares the item name for sending off to the api
            const name = (item.includes(',') ? item.substring(0, item.indexOf(',')) : item)
                .replace(/[^\x00-\x7F]/g, "")
                .trim();

            //store the item name for the rest of the modal
            setItemName(name);

            //send a request off to the API for the meal ideas
            fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + name)
                .then(response => {
                    response.json()
                        .then(ideas => {
                            // console.dir(ideas);
                            //set the list of meal ideas to the meal ideas found.
                            setMealIdeas(ideas.meals);
                        });
                })
                .catch(err => {
                    console.log("ERROR: ", err);
                });
        }

    }, [item]);

    return (
        <div
            className="w-full h-full bg-gray-700/70 absolute flex justify-center items-center"
            onClick={toggleVisibilityFunc}
        >
            
            <section
                className=" w-1/2 bg-slate-950 border border-blue-950 rounded-2xl"
                onClick={(event) => event.stopPropagation()}
            >

                {/* Modal Header */}
                <div className="border-b border-b-blue-950 pt-2 flex justify-end">
                    <h1 className="text-2xl text-center inline-block w-full pt-3">
                        Meal Ideas for <span className="capitalize">{itemName}</span>
                    </h1>


                    <button type="button" className="mr-5 align-middle" onClick={toggleVisibilityFunc}>X</button>
                </div>


                {/* Modal Body */}
                <div className="flex flex-col gap-5 p-10 pr-0">
                        {
                            mealIdeas
                            ? (
                                <div className="overflow-y-auto max-h-96">
                                    {mealIdeas.map(idea => 
                                        <MealCard
                                            key={idea.idMeal}
                                            meal={idea}
                                            selectedMealId={selectedMealid}
                                            setSelectedMealId={(newId) => setSelectedMealId(newId)}
                                        />
                                    )}
                                </div>
                            )
                            : (
                                <p>No Meals Found for <span className="capitalize">{itemName}</span></p>
                            )
                        }

                </div>

            </section>
        </div>
    );
};
