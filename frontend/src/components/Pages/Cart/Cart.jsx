import Header from '../../ui/Header/Header'
import Footer from '../../ui/Footer/Footer'
import './Cart.css'
import { Link } from "react-router-dom"
import CartCard from '../../ui/CartCard/CartCard'
import { BiRupee } from 'react-icons/bi'



const Cart = ({setCartData, cartData}) => {    
    const prices = cartData.map(each => each.cost)
    const totalPrice = prices.reduce((acc, cur) => {
        return acc + cur
    }, 0)
    const sortedCartItems = [...cartData].sort((a, b) =>
            a.name.localeCompare(b.name)
    );
    
    const placeOrder = () => {
        setCartData([])
    }
    return (
        <div className="cart-page">
            <Header activateId="cart" />
            {
                (cartData.length > 0 )?
                    <div className='orders-details'>
                        <table border="">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sortedCartItems.map(item => (
                                        <CartCard key={item.id} item={item} setCartData={setCartData} cartData={cartData} />
                                    ))
                                }
                            </tbody>
                            <hr />
                            <tfoot>
                                <tr>
                                    <td colSpan={2} className='order'><h1>Order Total:</h1></td>
                                    <td className='price-container'>
                                        <p className='total-price'><BiRupee />{totalPrice}.00</p>
                                        <Link to="/payment" className='link' onClick={placeOrder}><button >Place Order</button></Link>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div> :
                    <div className='no-orders'>
                        <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1770745603/cooking_1_eg22dc.png" alt="no orders" />
                        <h1>No Orders Yet!</h1>
                        <p>Your cart is empty. Add something from the menu.</p>
                        <Link to="/" className='link'><button>Order Now</button></Link>
                    </div>
            }
            <Footer/>
        </div>
    )
}

export default Cart