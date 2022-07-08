import React, {useEffect, useState} from 'react';
import { useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import axios from './axios';
import {db} from './firebase';


const Payment = () => {

    const navigate = useNavigate();
    const [{basket, user}, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(()=>{
        //generate the special strip secret which allows to charge a user

        const getClientSecret = async () =>{
            const response = await axios({
                method: 'post',
                //stripe expects the total in a currency's subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    console.log("The secret is >>>>", clientSecret);


    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) =>{
        //stripe stuff
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,
            {payment_method: {
                card: elements.getElement(CardElement)
                }
            }).then(({paymentIntent}) =>{
                //paymentIntent is the payment confirmation
                 db
                 .collection('users')
                 .doc(user?.uid)
                 .collection('orders')
                 .doc(paymentIntent.id)
                 .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created

                 })
                
                setSucceeded(true);
                setError(null);
                setProcessing(true);
                dispatch({
                    type:'EMPTY_BASKET'
                })
                navigate('/orders',{ replace: true});
            })
        

    }

    const handleChange = (e) =>{
        // e.preventDefault();
        //listen for changes in the CardElement
        //display errors as customer enters card details
        setDisabled(e.empty);
        setError(e.error? e.error.message : "");
    }


  return (
    <div className='payment'>
        <div className="payment__container">
             <h1 className="">
                Checkout (
                    <Link to="/checkout"> {basket?.length} item(s)</Link>
                )
             </h1>
            {/* Payment section  - delivery address*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p className="">{user?.email}</p>
                        <p className="">123 React Lane</p>
                        <p className="">Los Angeles, CA</p>
                    </div>
                </div>
                
                <div className="payment__section">
                    <div className="payment__title">
                        <h3 className="">Review Items and delivery</h3>
                        </div>
                        <div className="payment__items">
                            {basket.map(item => (
                                <CheckoutProduct
                                    id = {item.id}
                                    title = {item.title}
                                    image = {item.image}
                                    price = {item.price}
                                    rating = {item.rating}
                                    />
                            ))}
                        </div>
                </div>
            {/* Payment section  - review items*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3 className="">Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe */}
                        <form onSubmit={handleSubmit}>
                            <CardElement  onChange={handleChange}/>
                            <div className="payment__proceContainer">
                                <CurrencyFormat 
                                    renderText={(value) =>(
                                        <>
                                            <h3>Order Total: {value}</h3>  
                                        </>
                                    )}
                                    decimalScale = {2}
                                    value = {getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button className="" disabled = {processing || disabled || succeeded}>
                                    <span className="">{processing ? <p>Processing</p>: "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
                                
            {/* Payment section  - Payment methods*/}
                <div className="payment__section">
                    
                </div>
        </div>
    </div>
  )
}

export default Payment;