import ShoppingList from "./shopping-list";

/* The metadata object was found from here for specific pages:
 * https://nextjs.org/learn/dashboard-app/adding-metadata
 */

export const metadata = {
    title: "Shopping List",
    description: "A shopping list"
};

export default function Page() {
    return (
        <main className="font-mono text-gray-300">
            <ShoppingList/>
        </main>
    );
};
