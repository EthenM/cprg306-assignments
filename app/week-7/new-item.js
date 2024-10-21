"use client"

import { useState } from "react";

/**
 * 
 * @param {Object} param0
 * @param {function()} param0.toggleVisibilityFunc toggles the visibility of the modal
 * @param {function(import('@/app/week-7/shopping-list').ListItem): void} param0.addNewItem
 * @returns The NewItem modal to render
 */
export default function NewItem({ toggleVisibilityFunc, addNewItem }) {

    /**
     * A category that the user can choose.\
     * \
     * To be used in the {@link CATEGORIES|categories} enum
     * 
     * @typedef {Object} Category
     * @property {Number} val A numbered key to determine what the user has chosen.
     * @property {String} text The text value of the category to display to the screen
     */

    /**
     * An enum of {@link Category|category} the items could be
     * @enum {Category}
     */
    const CATEGORIES = Object.freeze({
        "PRODUCE": {val: 0, text: "Produce"},
        "DAIRY": {val: 1, text: "Dairy"},
        "BAKERY": {val: 2, text: "Bakery"},
        "MEAT": {val: 3, text: "Meat"},
        "FROZEN_FOODS": {val: 4, text: "Frozen Foods"},
        "CANNED_GOODS": {val: 5, text: "Canned Goods"},
        "DRY_GOODS": {val: 6, text: "Dry Goods"},
        "BEVERAGES": {val: 7, text: "Beverages"},
        "SNACKS": {val: 8, text: "Snacks"},
        "HOUSEHOLD": {val: 9, text: "Household"},
        "OTHER": {val: 10, text: "Other"}
      });


    //assign the defaults 
    const defaultName = "";
    const defualtQuantity = 1;
    /**
     * @type {Category}
     */
    const defaultCategory = CATEGORIES.PRODUCE;

    //set up the state varaibles
    const [quantity, setQuantity] = useState(defualtQuantity);
    const [name, setName] = useState(defaultName);
    const [category, setCategory] = useState(defaultCategory);
    

    //#region Quantity Functions

    const increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    //#endregion


    //#region Button Styles

    /**
     * Default styling for buttons on the page.
     */
    const buttonStyles = "bg-slate-800 hover:bg-slate-600 active:bg-slate-400 px-3 rounded-md border-2 border-blue-900 focus:border-blue-500";

    /**
     * default styling for disabled buttons on the page.
     */
    const buttonDisabled = "bg-gray-900 px-3 rounded-md border-2 border-blue-900 hover:cursor-not-allowed focus:border-blue-500";

    let incrementButtonStyles = quantity >= 20 ? buttonDisabled : buttonStyles;
    let decrementButtonStyles = quantity <= 1 ? buttonDisabled : buttonStyles;

    //#endregion


    //#region General Items

    /**
     * Stores information about items added to the shopping list
     * 
     * @typedef {Object} Item
     * @property {String} name The name of the item
     * @property {Number} quantity The number of this item needed
     * @property {category} category The category the item belongs to
     */

    /**
     * Handles the submission of the form
     * @param {Event} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        //The input thinks it's not empty, even if an empty string is entered,
        //so it needs to be double checked here.
        if (name === "") {
            alert("The Name cannot be empty.")
        } else {
            /** @type {import("@/app/week-7/shopping-list").ListItem} */
            const item = {
                name: name,
                quantity: quantity,
                category: category.text //ensure the category is passed back as the string
            };
        
            console.dir(item);

            addNewItem(item);
            alert("Added a new item:\n" + "Name: " + name + "\nQuantity: " + quantity + "\nCategory: " + category.text);
    
            //reset the state variables
            setName(defaultName);
            setQuantity(defualtQuantity);
            setCategory(defaultCategory);
        }

    };

    //#endregion

    return (
        <div
            className="w-full h-full bg-gray-700/70 absolute flex justify-center items-center"
            onClick={toggleVisibilityFunc}
        >
            
            <form
                className=" w-1/3 bg-slate-950 border border-blue-950 rounded-2xl"
                onClick={(event) => event.stopPropagation()}
            >

                <div className="border-b border-b-blue-950 pt-2 flex justify-end">
                    <h1 className="text-2xl text-center inline-block w-full">Add a New Item</h1>


                    <button type="button" className="mr-5 align-middle" onClick={toggleVisibilityFunc}>X</button>
                </div>

                <div className="flex flex-col gap-5 p-5">
                    {/* Name */}
                    <div>
                        <input required
                            type="text"
                            placeholder="Item name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="p-2 bg-slate-950 border-blue-950 border rounded-lg w-full focus:bg-slate-800"
                        />
                    </div>


                    <div className="flex gap-5 justify-between">

                        {/* Quantity */}
                        <div className="bg-slate-950 border-blue-950 border rounded-lg size-fit p-3 flex gap-2">
                            <div>
                                <p>Quantity: {quantity.toString().padStart(2, "0")}</p>
                            </div>
                            <div className="flex gap-1">
                                <button type="button" onClick={decrement} className={decrementButtonStyles}>-</button>
                                <button type="button" onClick={increment} className={incrementButtonStyles}>+</button>
                            </div>
                        </div>


                        {/* Category */}
                        <div>
                            <select
                                value={category.val}
                                // The value in the event will be val. this is a 0 based index of the category in the enum.
                                onChange={(event) => setCategory(CATEGORIES[Object.keys(CATEGORIES)[event.target.value]])}
                                className="p-3 bg-slate-950 border-blue-950 border rounded-lg w-full text-xl focus:bg-slate-800"
                            >
                                {/* Map the category keys, and create an option for each. */}
                                {Object.keys(CATEGORIES).map(category => 
                                    <option
                                        value={CATEGORIES[category].val}
                                        key={CATEGORIES[category].val}
                                    >
                                        {CATEGORIES[category].text}
                                    </option>)
                                }
                            </select>

                        </div>

                    </div>


                    <div className="flex justify-center">
                        <button
                            className="border rounded-lg border-blue-950 bg-slate-950 hover:bg-slate-900 active:bg-slate-800 py-2 px-5 text-xl"
                            type="submit"
                            onClick={handleSubmit}>Add Item</button>
                    </div>
                </div>

            </form>
        </div>
    );
};
