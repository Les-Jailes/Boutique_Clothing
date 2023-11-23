import { React, useContext, useState, useEffect, useCallback } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import '@/css/Cart/CheckoutButton.css';
import PropTypes from 'prop-types';

import { useRouter } from 'next/navigation'
import { showErrorMessage } from "@/utils/alerts";
import { CartContext } from "@/components/Products/CartContext";

const CheckOutButton = ({ isOpen, disabled }) => {
  const { cart } = useContext(CartContext);
  const [disable, setDisable] = useState(true);
  const router = useRouter(); 
  const [intervalActive, setIntervalActive] = useState(true);
  const [aux, setAux] = useState(true);


  const intervalFunction = () => {
    setVisibilityButton();
    if (cart.products.length > 0) {
      setIntervalActive(false); 
    }
  };

  useEffect(() => {
    const intervalId = setInterval(intervalFunction, 50);
    if(!intervalActive) setAux(false);

    return () => clearInterval(intervalId);
  });

  const setVisibilityButton = async () => {
    
    
  let flag =  false;
  await cart.products.forEach(p => {
        
        if(!p.available) flag = true;});
  setDisable(flag);
  }
  
  return (
    <a className={ `checkout-button ${!isOpen ? 'is-active' : ''} ${ disable ? 'disabled' : ''}`} href="/pages/checkout" >
        <AiOutlineShoppingCart />
        <p className="checkout-button-text">
            Checkout
        </p>
    </a>
  )
};

CheckOutButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired  
}

export default CheckOutButton;
