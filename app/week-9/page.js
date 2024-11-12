"use client"

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";


export default function AuthenticationPage() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const handleSignIn = () => {
        //attempt to sign the user in.
        //if an error occurs, catch it, and display the error
        gitHubSignIn()
            .catch(err => {
                console.log("ERROR: " + err);
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

    const buttonStyles = "border border-blue-950 rounded-xl bg-slate-950 px-2 py-1 hover:bg-slate-900 active:bg-slate-800";

    return (
        <main className="font-mono">
            <h1 className="text-3xl text-center border-b border-b-blue-950 pt-5 mb-5">Shopping List Sign In</h1>
            
            {
                // if the user is authenticated, show a link to the shopping list,
                // a logout button, and a welcome message.
                //if not, show a sign in button.
                user
                    ? (
                        <div>
                            <h2 className="text-2xl">Welcome, {user.displayName} ({user.email})</h2>
                            <p>
                                <Link className="underline text-blue-500 hover:text-blue-200 text-lg" href="/week-9/shopping-list">
                                    Go To Shopping List
                                </Link>
                            </p>
                            <button
                                className={buttonStyles}
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        </div>
                    )
                    : (
                        <div>
                            <button
                                className={buttonStyles}
                                onClick={handleSignIn}
                            >
                                Sign In
                            </button>
                        </div>
                    )
            }
        </main>
    );
};
