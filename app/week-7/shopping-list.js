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

    const idLength = 16;
    const charactersForId = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


    const toggleNewItemOpen = () => setNewItemOpen((prevVal) => !prevVal);


    /**
     * Creates a string of random alphanumeric characters.
     * 
     * Adapted from: 
     * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
     * 
     * @param {Number} length The number of characters to add to the string
     * @returns The character string created
     */
    function makeId(length) {
        let result = '';
        
        //loop until the length is reached, and add a random character to the string.
        for (let i = 0; i < length; i++) {
            result += charactersForId.charAt(
                Math.floor(Math.random() * charactersForId.length)
            );
        }
        
        return result;
    }

    const addItem = (newItem) => {
        //generate a new 16 char long string
        let id = "";

        //continue generating ids until an id is found that does not yet exist
        do {
            id = makeId(idLength)
        } while (items.find(item => item.id == id));

        //add the id to the new item
        newItem.id = id;

        setItems((prevArray) => [...(prevArray), newItem])
    };
    
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
