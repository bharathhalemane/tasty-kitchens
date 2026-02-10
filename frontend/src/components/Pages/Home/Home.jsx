import Footer from "../../ui/Footer/Footer"
import Header from "../../ui/Header/Header"
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import './Home.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { MdSort } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import Dropdown from "../../ui/DropDown/DropDown"
import RestaurantCards from "../../ui/ResturantCards/RestaurantCards"

const sortByOptions = [
    {
        id: "LOWEST",
        value: "Lowest"
    },
    {
        id: "HIGHEST",
        value: "Highest"
    }
]

const Home = () => {
    const [offersList, setOffersList] = useState([])
    const [popularRestaurant, setPopularRestaurant] = useState([])
    const [sortByFilter, setSortByFilter] = useState(sortByOptions[0].id)


    const jwtToken = Cookies.get("jwtToken")

    const getOffersList = async () => {
        const url = 'https://apis.ccbp.in/restaurants-list/offers'
        const option = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const response = await fetch(url, option)
        const data = await response.json()
        if (response.ok) {
            const formattedData = data.offers.map(offer => ({ id: offer.id, imageUrl: offer.image_url }))
            setOffersList(formattedData)
        } else {
            console.log(data.error_msg)
        }
    }

    const formattedRestaurantData = data => ({
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        groupByTime: data.group_by_time,
        hasOnlineDelivery: data.has_online_delivery,
        hasTableBooking: data.has_table_booking,
        id: data.id,
        imageUrl: data.image_url,
        isDeliveringNow: data.is_delivering_now,
        location: data.location,
        menuType: data.menu_type,
        name: data.name,
        opensAt: data.opens_at,
        userRating: {
            rating: data.user_rating.rating,
            ratingColor: data.user_rating.rating_color,
            ratingText: data.user_rating.rating_text,
            totalReviews: data.user_rating.total_reviews
        }
    })

    const getPopularRestaurantDetails = async (sort) => {
        const url = `https://apis.ccbp.in/restaurants-list?offset=${0}&limit=${9}&sort_by_rating=${sort}`
        const option = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const response = await fetch(url, option)
        const data = await response.json()
        if (response.ok) {
            const formattedData = data.restaurants.map(restaurant => formattedRestaurantData(restaurant))
            setPopularRestaurant(formattedData)
            console.log(formattedData)
        } else {
            console.log(data.error_msg)
        }
    }

    const onChangeSort = value => {
        setSortByFilter(value)        
        console.log(value)
        getPopularRestaurantDetails(value)
    }



    useEffect(() => {
        getOffersList()
        getPopularRestaurantDetails()
    }, [])

    const OffersCarousel = () => {
        var settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            useCss: true,
        }
        return (
            <Slider {...settings} className="">
                {
                    offersList.map(offers => (
                        <div className="carousel-container" key={offers.id}>
                            <img className="offers-image" src={offers.imageUrl} alt="" />
                        </div>
                    ))
                }
            </Slider>
        );
    }

    const RestaurantDetails = () => (
        <div className="restaurant-container">
            <div className="restaurant-container-header">
                <div className="header">
                    <h1>Popular Restaurant</h1>
                    <div className="search-input">
                        <input type="search" placeholder="Search Restaurant" />
                        <BiSearch className="search-icon"/>
                    </div>
                </div>
                <div className="sort-selection-container">
                    <p>Select your favorite restaurant special dish and make your day happy...</p>
                    <div className="sort-by-option">
                        <MdSort />
                        <Dropdown options={sortByOptions} onChange={onChangeSort} />
                    </div>
                </div>
            </div>            
            <hr/>
            <ul className="restaurant-list">
                {
                    popularRestaurant.map(each => (
                        <RestaurantCards data={each} key={each.id} />
                    ))
                }
            </ul>
        </div>
    )
    return (
        <div className="home-page">
            <Header activateId="home" />
            <div className="home-restaurant-details-container">
                {OffersCarousel()}
                {RestaurantDetails()}
            </div>
            <Footer />
        </div>
    )
}

export default Home