import { Item } from "./Item";
import style from './Cart.module.css';
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function Cart() {
    const { cartData } = useContext(GlobalContext);
    const [totalSum, setTotalSum] = useState(0);

    function handleTotalSumChange(priceChange) {
        setTotalSum(n => n + priceChange);
    }

    return (
        <div className={style.cart}>
            <h2>Prekiu krepselis</h2>
            <table>
                <thead className={style.thead}>
                    <tr>
                        <td>Name</td>
                        <td>Unit price</td>
                        <td>Amount</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody className={style.tbody}>
                    {
                        cartData.map((itemData, index) =>
                            <Item key={index} data={itemData} onSumChange={handleTotalSumChange} />)
                    }
                </tbody>
            </table>
            <div className={style.total}>Galutine moketina suma: <span>{totalSum}</span> Eur</div>
        </div>
    );
}