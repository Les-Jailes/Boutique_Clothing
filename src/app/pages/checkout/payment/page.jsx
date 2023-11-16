"use client";
import styles from './page.module.css';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutPayment from '@/components/Stripe/Checkout';

const stripePromise = loadStripe("pk_test_51OCqsPKatRUjy102Td6aLt9zQV9foWD8Pl4IAdOxIlxsMddBdnPlGNcmc51m28yl5LAfJFnnnoLkZK2ZEtWkxPZD00SsrdvORk");

const Checkout = () => {
  return (
    <Elements stripe={stripePromise} >
        <CheckoutPayment />
    </Elements>
  )
}

export default Checkout