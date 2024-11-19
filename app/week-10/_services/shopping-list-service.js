import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

/**
 * Gets a list of items that belong to the user
 * 
 * @param {int} userId The id of the user currently authenticated
 * @returns A promise of the list of items that belong to the user
 */
export const getItems = (userId) => {
    
    //only try getting the items if the database exists
    if (db) {

        //build the reference and query to get all items for the user
        const itemsFromUserReference = collection(db, "users", userId, "items");
        const itemsFromUserQuery = query(itemsFromUserReference);

        //send the request to the database
        return getDocs(itemsFromUserQuery)
            .then(querySnap => {
                /**@type {import('../shopping-list/shopping-list').ListItem[]} */
                const items = []

                //loop through the query snapshot, and add the items to the list
                querySnap.forEach(docSnap => {
                    
                    //create a new item with the data returned from the query
                    /**@type {import('../shopping-list/shopping-list').ListItem} */
                    const item = {
                        id: docSnap.id,
                        ...(docSnap.data())
                    };

                    //push the new item to the items list
                    items.push(item);
                });

                return items;
            })
            .catch(err => {
                console.log("ERROR: getItems: " + err);
                throw err;
            });
    } else {
        throw new Error("The database was not loaded.")
    }
}

/**
 * Attempts to add a new item to the database, under the user given
 * 
 * @param {int} userId The id of the currently authenticated user
 * @param {*} item The new item to be added to the database
 * @returns The id of the new item
 */
export const addItem = (userId, item) => {
    //create a reference to the items collection
    const newItemReference = collection(db, "users", userId, "items");

    //attenpt to add the item to the database
    return addDoc(newItemReference, item)
        .then(response => {
            return response.id
        })
        .catch(err => {
            console.log("ERROR: addItem: " + err);
            throw err;
        })
}
