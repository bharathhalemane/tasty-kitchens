import './Footer.css'
import { FaPinterestSquare, FaInstagram, FaTwitter, FaFacebookSquare} from "react-icons/fa";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="logo-container">
                <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1770451295/Frame_275_ovel4s.png" />
                <h1>Tasty Kitchens</h1>
            </div>
            <p>The only thing we are serious about is food.</p>
            <p>Contact us on</p>
            <div className='contact-icons'>
                <FaPinterestSquare className='icons'/>
                <FaInstagram className='icons' />
                <FaTwitter className='icons' />
                <FaFacebookSquare className='icons'/>
            </div>
        </div>
    )
}

export default Footer