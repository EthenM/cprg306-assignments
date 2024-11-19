"use client"

import { useUserAuth } from "../_utils/auth-context";
import ShoppingList from "./shopping-list";

export default function Page() {
    const { user } = useUserAuth();


    //if the user is not defined, send the user back to the login page.
    if (!user) {
        //this just ensures that the rest of the page isn't rendered.
        return (
            <main>
                <p>You must be signed in to access this page.</p>
            </main>
        );
    }

    return (
        <main className="font-mono text-gray-300">
            <ShoppingList/>
        </main>
    );
};
