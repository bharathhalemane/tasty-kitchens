import './RestaurantCards.css'
import { AiFillStar } from "react-icons/ai";
import {Link} from "react-router-dom"

const RestaurantCards = ({ data }) => {
    const { imageUrl, userRating, cuisine, name, id } = data 
    const {rating, totalReviews} = userRating
    return (
        <Link to={`/restaurant/${id}`} className='restaurant-card-link'>
        <div className="restaurant-card">
            <div className="restaurant-image">
                <img src={imageUrl} alt={name} />
            </div>

            <div className="restaurant-info-details">
                <h1 className="restaurant-name">{name}</h1>
                <p className="restaurant-cuisine">{cuisine}</p>

                <div className="restaurant-rating">
                <span className="rating-value"><AiFillStar color="#ffcc00"/> {rating}</span>
                <span className="rating-count">({totalReviews} reviews)</span>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default RestaurantCards