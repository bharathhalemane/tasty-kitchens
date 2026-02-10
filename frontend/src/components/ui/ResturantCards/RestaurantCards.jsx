import './RestaurantCards.css'
import { AiFillStar } from "react-icons/ai";

const RestaurantCards = ({ data }) => {
    const { imageUrl, userRating, cuisine, name } = data 
    const {rating, totalReviews} = userRating
    return (
        <div className="restaurant-card">
            <div className="restaurant-image">
                <img src={imageUrl} alt={name} />
            </div>

            <div className="restaurant-info">
                <h1 className="restaurant-name">{name}</h1>
                <p className="restaurant-cuisine">{cuisine}</p>

                <div className="restaurant-rating">
                <span className="rating-value"><AiFillStar color="#ffcc00"/> {rating}</span>
                <span className="rating-count">({totalReviews} reviews)</span>
                </div>
            </div>
        </div>

    )
}

export default RestaurantCards