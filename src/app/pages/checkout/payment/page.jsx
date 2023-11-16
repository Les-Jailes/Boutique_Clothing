"use client";
import "@/css/StripeStyles/CheckoutPayment.css";
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { Elements } from '@stripe/react-stripe-js';
import CheckoutPayment from '@/components/Stripe/Checkout';
import Summary from "@/components/Checkout/Summary";
import { CiCreditCard1 } from "react-icons/ci";


const stripePromise = loadStripe("pk_test_51OCqsPKatRUjy102Td6aLt9zQV9foWD8Pl4IAdOxIlxsMddBdnPlGNcmc51m28yl5LAfJFnnnoLkZK2ZEtWkxPZD00SsrdvORk");

const CheckoutPaymentOperation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenning = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="shopping-cart-container">
      <div className="your-cart-container">
        <div className="card-header">
          <CiCreditCard1 />
          <span>Card</span>
        </div>
        <div className="list-your-cart-container">
          <Elements stripe={stripePromise} >
            <CheckoutPayment />
          </Elements>
        </div>
      </div>
      <div className={`more-information-container ${isOpen ? "active" : ""}`}>
        <button
          className="open-more-information-button"
          onClick={() => handleOpenning()}
        >
          {isOpen ? (
            <AiOutlineDown size={18} color="white" />
          ) : (
            <AiOutlineUp color="white" size={18} />
          )}
        </button>
        <Summary />
      </div>
    </div>
  )
}

export default CheckoutPaymentOperation