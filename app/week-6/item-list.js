"use client"

import Item from "./item";
import { useState } from "react"
import jsonItems from "./items.json";

/**
 * An item for the shopping list
 * 
 * @typedef {Object} ListItem
 * @property {String} id The item's id
 * @property {String} name The item's name
 * @property {Number} quantity The quantity of the item
 * @property {String} category The item's category
 */

/**@type {ListItem[]} */
const items = jsonItems //copied it here to get better intellisense

/**
 * Stores the different ways the objects could be sorted by
 * 
 * @enum {Number}
 */
const SORT_BY_STATES = Object.freeze({
    "NAME": 0,
    "CATEGORY": 1
});

export default function ItemList() {
    const [sortBy, setSortBy] = useState(SORT_BY_STATES.NAME);

    //sort the items array
    const sortedItems = items.sort((a, b) => {
        //check the state to determine how to sort the array
        const sortVal = sortBy == SORT_BY_STATES.NAME ? "name" : "category";
        let returnVal = 0;

        //run the logic.
        //since strings might be coming around, find the value manually
        returnVal = a[sortVal] > b[sortVal] 
            ? 1
            : a[sortVal] < b[sortVal]
                ? -1
                :0;

        return returnVal;
    })

    /**
     * Styles to apply to all of the buttons
     */
    const buttonStyles = "px-3 rounded-md border-2 border-blue-950 capitalize";


    return (
        <div>
            <div className="flex gap-4 p-3">
                <p>Sort By: </p>
                
                {/* loop through the available states in the enum, and create buttons for them */}
                {Object.keys(SORT_BY_STATES).map(state => 
                    <button
                        // classname uses some constant styling plus some specific styling based on
                        //wheter or not the state is the active state.
                        className={buttonStyles + (sortBy == SORT_BY_STATES[state]
                            ? " bg-slate-600"
                            : " bg-slate-950 hover:bg-slate-800")}
                        onClick={() => setSortBy(SORT_BY_STATES[state])}
                    >
                        {/* This has to be forced to lowercase to ensure the capitalization works properly */}
                        {state.toLowerCase()}
                    </button>
                )}
            </div>
            <div className="flex justify-center flex-wrap">

                {items.map(item =>
                    <Item
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}/>
                )}
            </div>

        </div>
    );
};
