import ItemList from "./item-list";

/* The metadata object was found from here for specific pages:
 * https://nextjs.org/learn/dashboard-app/adding-metadata
 */

export const metadata = {
    title: "Shopping List",
    description: "A shopping list"
}

export default function Page() {
    return (
        <main className="font-mono text-gray-300">
            <h1 className="text-6xl text-center mb-4 border-b border-b-blue-950 pt-3">Shopping List</h1>

            <ItemList/>
        </main>
    );
}
