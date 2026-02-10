import './FoodCard.css'
import { BiRupee } from 'react-icons/bi'
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useState } from 'react'

const FoodCard = ({ food, setCartData }) => {
    const cartData = JSON.parse(localStorage.getItem("cartData"))
    const { imageUrl, name, cost, rating, id } = food
    const [add, setAdd] = useState(false)
    const [itemCount, setItemCount] = useState(0)

    useEffect(() => {
        const item = cartData.find(each => each.id === id)
        if (item) {
            setAdd(true)
            setItemCount(item.quantity)
        }        
    },[id])

    const addOne = () => {         
        const data = { imageUrl, name, cost, id, quantity: 1 }
        let newData = [...cartData, data]
        setAdd(true)
        setItemCount(1)
        setCartData(newData)
    }

    const removeOneItem = () => {
        if (itemCount === 1) {
            setAdd(false)
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
        <div className="food-card">
            <img className="food-image" src={imageUrl} alt={name} />

            <div className="food-details">
                <h1 className="food-name">{name}</h1>

                <p className="food-price">
                    <BiRupee className="rupee-icon" /> {cost}.00
                </p>

                <div className="food-rating">
                    <AiFillStar className="star-icon" /> {rating}
                </div>

                <button className={add ? "d-none" : "add-btn"} onClick={addOne}>Add</button>
                <div className={add ? "add-remove-btn" : "d-none"}>
                    <button onClick={removeOneItem}>-</button>
                    <p>{itemCount}</p>
                    <button onClick={addOneItem}>+</button>
                </div>
            </div>
        </div>
    )
}

export default FoodCard