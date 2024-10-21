"use client"

import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemData from "./items.json";

/**
 * An item for the shopping list
 * 
 * @typedef {Object} ListItem
 * @property {String} id The item's id
 * @property {String} name The item's name
 * @property {Number} quantity The quantity of the item
 * @property {String} category The item's category
 */


export default function ShoppingList() {
    const [newItemOpen, setNewItemOpen] = useState(false);

    /**@type {ListItem[]} */
    const jsonItems = [...itemData];
    const [items, setItems] = useState(jsonItems);


    const toggleNewItemOpen = () => setNewItemOpen((prevVal) => !prevVal);
    const addItem = (newItem) => setItems((prevArray) => [...(prevArray), newItem]);
    
    return(
        <div>
            {
                newItemOpen &&
                <NewItem toggleVisibilityFunc={toggleNewItemOpen} addNewItem={addItem} />
            }
            
            <h1 className="text-6xl text-center mb-4 border-b border-b-blue-950 pt-3">Shopping List</h1>

            <button
                className="bg-slate-950 hover:bg-slate-800 active:bg-slate-700 py-2 px-4 rounded-md border-2 border-blue-950"
                onClick={toggleNewItemOpen}
            >
                Add a New Item
            </button>

            <ItemList items={items}/>
        </div>
    );
};
