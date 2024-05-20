/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function Item({ data, onSumChange }) {
    const { updateTotalSumToPay, updateCartItemAmount } = useContext(GlobalContext);
    const { name, price, amount: initialAmount } = data;
    const [amount, setAmount] = useState(initialAmount);

    function handleAmountPlus() {
        setAmount(n => n + 1);
        onSumChange(price);
        updateTotalSumToPay(price);
        updateCartItemAmount(name, 1);
    }

    function handleAmountMinus() {
        if (amount > 0) {
            setAmount(n => n - 1);
            onSumChange(-price);
            updateTotalSumToPay(-price);
            updateCartItemAmount(name, -1);
        }
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{price} Eur</td>
            <td>
                <button onClick={handleAmountMinus}>-</button>
                {amount}
                <button onClick={handleAmountPlus}>+</button>
            </td>
            <td>{price * amount} Eur</td>
        </tr>
    );
}