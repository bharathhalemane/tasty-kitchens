import Header from '../../ui/Header/Header';
import './Payment.css'
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Payment = () => {
    return (
        <div className='payment-page'>
            <Header activateId="cart"/>
            <div className='payment-success'>
                <FaCircleCheck size={80} color='#22c55e' />
                <h1>Payment Successful</h1>
                <p>Thank you for ordering<br/>Your payment is successfully completed.</p>
                <Link to="/"><button className='home-btn'>Go To Home Page</button></Link>                
            </div>
        </div>
    )
}

export default Payment