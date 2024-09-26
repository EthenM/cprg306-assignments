"use client"

import { useState } from "react";

export default function NewItem() {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    
    /**
     * Default styling for buttons on the page.
     */
    const buttonStyles = "bg-slate-800 hover:bg-slate-600 active:bg-slate-400 px-3 rounded-md border-2 border-blue-900 focus:border-blue-500";

    /**
     * default styling for disabled buttons on the page.
     */
    const buttonDisabled = "bg-gray-900 px-3 rounded-md border-2 border-blue-900 hover:cursor-not-allowed focus:border-blue-500";

    let incrementButtonStyles = quantity >= 20 ? buttonDisabled : buttonStyles;
    let decrementButtonStyles = quantity <= 1 ? buttonDisabled : buttonStyles;

    return (
        <div className="bg-slate-950 border-blue-950 border rounded-lg size-fit p-3 flex gap-2">
            <div>
                <p>Quantity: {quantity.toString().padStart(2, "0")}</p>
            </div>
            <div className="flex gap-1">
                <button onClick={decrement} className={decrementButtonStyles}>-</button>
                <button onClick={increment} className={incrementButtonStyles}>+</button>
            </div>
        </div>
    );
}
