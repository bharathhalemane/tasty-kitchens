import './CartCard.css'
import { BiRupee } from 'react-icons/bi'
import { useState } from 'react'

const CartCard = ({ item,cartData, setCartData }) => {
    const { imageUrl, cost, quantity, name, id } = item     
    const [itemCount, setItemCount] = useState(quantity)       
        

    const removeOneItem = () => {
        if (itemCount === 1) {
            let newData = cartData.filter(each => each.id !== id)
            return setCartData(newData)
        }        
        setItemCount(prevStat => prevStat - 1)
        let newData = cartData.filter(each => each.id !== id)
        newData = [...newData, { imageUrl, name, cost, id, quantity: itemCount - 1}]
        setCartData(newData)
    }

    const addOneItem = () => {
        setItemCount(prevStat => prevStat + 1)
        let newData = cartData.filter(each => each.id !== id)
        newData = [...newData, { imageUrl, name, cost, id, quantity: itemCount + 1}]
        setCartData(newData)
    }

    return (
        <tr className="cart-row">
            <td className="cart-item">
                <img src={imageUrl} alt={name} className="cart-item-img" />
                <h1 className="cart-item-name">{name}</h1>
            </td>

            <td className="cart-qty">
                <button className="qty-btn" onClick={removeOneItem}>−</button>
                <span className="qty-count">{itemCount}</span>
                <button className="qty-btn" onClick={addOneItem}>+</button>
            </td>

            <td className="cart-price">
                <p>
                <BiRupee />
                {cost * quantity}.00
                </p>
            </td>
        </tr>
    )
}

export default CartCard