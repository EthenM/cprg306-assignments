export default function Item({name, quantity, category}) {
    return (
        <div
            className="border border-blue-950 bg-slate-950 rounded-xl min-w-72 size-fit min-h-40 m-2 hover:bg-slate-900"
        >
            <h3
                className="font-bold text-xl text-center pt-3 border-b border-b-blue-950 mb-5"
            >
                {name}
            </h3>
            <ul className="flex gap-3 flex-col">
                <li className="mx-3 px-1 border border-blue-900 rounded flex">
                    <p className="inline-block">Quantity:</p>
                    <p className="inline-block text-right ml-auto">{quantity}</p>
                </li>
                <li className="mx-3 px-1 mt-1 border border-blue-900 rounded flex">
                    <p className="inline-block ">Category:</p>
                    <p className="inline-block text-right ml-auto">{category}</p>
                </li>
            </ul>
        </div>
    );
};
