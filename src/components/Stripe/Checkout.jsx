"use client";
import React, { useState } from "react";
import '@/css/StripeStyles/Checkout.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "white",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "18px", 
            "::placeholder": {
                color: "#aab7c4"
            },
            border: '1px solid black', 
            padding: '12px' 
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
};


function CheckoutForm() {
    const [shippingInfo, setShippingInfo] = useState({
        cardOwner: '',
        address: '',
        country: '',
        phone: ''
    });

    const stripe = useStripe();
    const elements = useElements();

    const handleInputChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                name: shippingInfo.cardOwner,
                address: {
                    line1: shippingInfo.address,
                    country: shippingInfo.country,
                },
                phone: shippingInfo.phone
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Shipping Information</h2>
            <h3>Shipping Address</h3> 
            <div className="input-group">
                <input type="text" name="cardOwner" placeholder="Card Owner Name" onChange={handleInputChange} />
                <input type="text" name="address" placeholder="Address" onChange={handleInputChange} />
                <input type="text" name="country" placeholder="Country" onChange={handleInputChange} />
                <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} />
            </div>
            <h3>Payment Details</h3> 
            <div className="card-details">
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            <div className="div-button">
                <button type="submit" className="buy-button">
                    Buy
                </button>
            </div>
        </form>
    );
    
};

export default CheckoutForm;