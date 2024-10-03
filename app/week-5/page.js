import NewItem from "./new-item";

export const metadata = {
    title: "CPRG 306: Shopping List",
    description: "A shopping list where you can add new items"
}

export default function Page() {
    return (
        <main className="font-mono flex justify-center items-center h-screen">
            <NewItem/>
        </main>
    );
}
