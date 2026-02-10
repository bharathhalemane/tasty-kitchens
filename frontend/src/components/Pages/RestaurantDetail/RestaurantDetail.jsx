import { useParams } from "react-router-dom"
import Header from "../../ui/Header/Header"
import Footer from "../../ui/Footer/Footer"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { AiFillStar } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import './RestaurantDetail.css'
import FoodCard from "../../ui/FoodCard/FoodCard"


const RestaurantDetail = ({setCartData}) => {
    const { id } = useParams()
    const [restaurantDetail, setRestaurantDetail] = useState({})
    const jwtToken = Cookies.get("jwtToken")    
    const foodItemsFormat = food => ({
        cost: food.cost,
        foodType: food.food_type,
        id: food.id,
        imageUrl: food.image_url,
        name: food.name,
        rating: food.rating
    })

    const restaurantDetailFormat = data => ({
            costForTwo: data.cost_for_two,
            cuisine: data.cuisine,
            id: data.id,
            imageUrl: data.image_url,
            itemsCount: data.items_count,
            location: data.location,
            name: data.name,
            opensAt: data.opens_at,
            rating: data.rating,
            reviewsCount: data.reviews_count,
            foodItems: data.food_items.map(food=> foodItemsFormat(food))
        })
    

    const getRestaurantDetail = async() => {
        const url = `https://apis.ccbp.in/restaurants-list/${id}`
        const option = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const response = await fetch(url, option)
        const data = await response.json()
        if (response.ok) {
            const restaurantFormattedData = restaurantDetailFormat(data) 
            setRestaurantDetail(restaurantFormattedData)
        }else{
            console.log(data.error_msg)
        }
    }

    useEffect(() => {
        getRestaurantDetail()   
    }, [])

    const Banner = () => {
        const {imageUrl, name, costForTwo, rating, cuisine, location, reviewsCount} = restaurantDetail
        return (
            <div className="banner">
                <img className="banner-image" src={imageUrl} alt={name} />

                <div className="banner-content">
                    <h1 className="restaurant">{name}</h1>
                    <p className="restaurant">{cuisine}</p>
                    <p className="restaurant-location">{location}</p>

                    <div className="banner-meta">
                    <div className="rating-box">                        
                            <p className="rating"><AiFillStar className="star-icon" />
                         {rating}
                            </p>
                            <p>{reviewsCount}+ Ratings</p>
                    </div>

                    <div className="divider"></div>

                    <div className="cost-box">
                        <p className="cost"><BiRupee className="rupee-icon"/>{costForTwo}</p>
                        <p className="cost-label">Cost for two</p>
                    </div>
                    </div>
                </div>
                </div>

        )
    }
    
    const FoodItemsList = ({ restaurantDetail }) => {
        if (!restaurantDetail?.foodItems) return null;

        return (
            <ul className="food-list">
                {restaurantDetail.foodItems.map(food => (
                    <li key={food.id}>
                        <FoodCard food={food} setCartData={setCartData} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="restaurant-detail-page">
            <Header />
            {Banner()}
            {FoodItemsList({restaurantDetail})}
            <Footer/>
        </div>
        
    )
}

export default RestaurantDetail