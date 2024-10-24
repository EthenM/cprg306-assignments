"use client"

import { useState } from "react";

/**
 * 
 * @param {Object} param0
 * @param {function()} param0.toggleVisibilityFunc toggles the visibility of the modal
 * @param {String} param0.item The item to get the meal ideas for.
 * @returns The NewItem modal to render
 */
export default function MealIdeas({ toggleVisibilityFunc, item}) {


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
                    <h1 className="text-2xl text-center inline-block w-full">
                        Meal Ideas For {item}
                    </h1>


                    <button type="button" className="mr-5 align-middle" onClick={toggleVisibilityFunc}>X</button>
                </div>


                {/* Modal Body */}
                <div className="flex flex-col gap-5 p-5">
                   
                    <p>This is the body</p>

                </div>

            </section>
        </div>
    );
};
