import './Header.css'
import { useState } from 'react'
import { Link, replace } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import { MdOutlineMenu } from "react-icons/md";

const Header = (props) => {
    const { activateId } = props
    const [mobileMenuBar, setMobileMenuBar] = useState(false)
    const navigate = useNavigate()

    const links = [
        { name: "Home", path: "/", id: "home" },
        { name: "Cart", path: "/cart", id: "cart" }
    ]

    const logout = () => {
        Cookies.remove("jwtToken")
            navigate("/login", { replace: true })
    }

    const onClickMenu = () => {
        setMobileMenuBar(prevStat => !prevStat)
    }

    return (
        <div className='header-container'>
            <div className='container'>
                <div className='logo-container'>
                    <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1770441023/Frame_274_bhcyuh.png" alt="" />
                    <h1 className="logo-title">Tasty Kitchens</h1>
                </div>
                <div className='desktop-links'>
                    <ul>
                        {
                            links.map(each => (
                                <li key={each.id}>
                                    <Link to={each.path} className={activateId === each.id ? "activate-link" : "link"}>{each.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                    <button className="logout-button" onClick={logout}>Logout</button>
                </div>
                <div className='mobile-menu-link'>
                    <MdOutlineMenu onClick={onClickMenu} size={30} />
                </div>
            </div>
            <div className={`mobile-menu ${mobileMenuBar ? "" : "d-none"}`}>
                <ul>
                    {
                        links.map(each => (
                            <li key={each.id}>
                                <Link to={each.path} className={activateId === each.id ? "activate-link" : "link"}>{each.name}</Link>
                            </li>
                        ))
                    }
                </ul>
                <button className="logout-button" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Header