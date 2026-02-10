import './PageNotFound.css'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return <div className='not-found-page'>
        <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1770752492/erroring_1_j8jdpw.png" alt="not found" />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page your requested could not be found. <br /> Please go back to the homepage</p>
        <Link to="/"><button>Home Page</button></Link>        
    </div>
}

export default PageNotFound