import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import '@/css/Cart/CheckoutButton.css'

const CheckOutButton = ({ isOpen }) => {
  return (
    <a className={ `checkout-button ${ !isOpen ? 'is-active' : '' }` } href="/pages/checkout">
        <AiOutlineShoppingCart />
        <p className="checkout-button-text">
            Checkout
        </p>
    </a>
  )
};

export default CheckOutButton;
