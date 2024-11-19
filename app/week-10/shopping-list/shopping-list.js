"use client"

import { useEffect, useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

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
    const { firebaseSignOut, user } = useUserAuth();

    const [newItemOpen, setNewItemOpen] = useState(false);
    const [mealIdeasOpen, setMealIdeasOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");

    const [items, setItems] = useState([]);

    useEffect(() => {

        //if there is a selected item, open the modal
        if (selectedItem != "") {
            setMealIdeasOpen(true);
        }
        
    }, [selectedItem]);

    useEffect(() => {
        if (user) {
            loadItems();
        }
    }, [user])

    const loadItems = () => {

        //get the items from the database
        getItems(user.uid)
            .then(response => {
                setItems(response);
            })
            .catch(err => {
                console.log("ERROR: loadItems: " + err)
            });
    }

    /**
     * Creates and returns a wrapper for the given setter method to toggle a modal.
     * 
     * @param {function(*)} setModalOpen The setter method for the modal
     * @returns A function to wrap the setter method around
     */
    const setterWrapper = (setModalOpen) => () => setModalOpen((prevVal) => !prevVal);

    /**
     * Adds a new item to the list of items.
     * 
     * @param {ListItem} newItem the item to add, without the id
     */
    const addNewItem = (newItem) => {

        //add the new item to the database, and store the id when returned.
        addItem(user.uid, newItem)
            .then(id => {
                newItem.id = id;

                setItems((prevArray) => [...(prevArray), newItem]);
            })
            .catch(err => {
                console.log("ERROR: addNewItem: " + err);
            });

    };

    const handleSignOut = () => {
        //attempt to sign the user out
        //if an error occurs, catch it, and display the error
        firebaseSignOut()
            .catch(err => {
                console.log("ERROR: " + err);
            });
    };
    
    return(
        <div>
            {
                newItemOpen &&
                <NewItem toggleVisibilityFunc={setterWrapper(setNewItemOpen)} addNewItem={addNewItem} />
            }

            {
                mealIdeasOpen &&
                <MealIdeas
                    toggleVisibilityFunc={() => [
                        setMealIdeasOpen(prevVal => !prevVal),
                        setSelectedItem("")
                    ]}
                    item={items.find(item => item.id == selectedItem).name}
                />
            }
            

            <header className="border-b border-b-blue-950 flex justify-end mb-4">
                <h1 className="text-6xl text-center pt-3 inline-block w-full">Shopping List</h1>

                <button
                    className="border border-blue-950 rounded-xl h-10 m-4 bg-slate-950 px-4 text-nowrap hover:bg-slate-900 active:bg-slate-800"
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
            </header>

            <button
                className="bg-slate-950 hover:bg-slate-800 active:bg-slate-700 py-2 px-4 rounded-md border-2 border-blue-950"
                onClick={setterWrapper(setNewItemOpen)}
            >
                Add a New Item
            </button>

            <ItemList
                items={items}
                setSelectedItem={(itemSelected) => setSelectedItem(itemSelected)}
            />
        </div>
    );
};
