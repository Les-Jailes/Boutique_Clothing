"use client";

import React, { useState, useContext, useEffect } from "react";
import "@/css/Checkout/Checkout.css";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { CartContext } from "@/components/Products/CartContext";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import Summary from "@/components/Checkout/Summary";
import { useSession } from "next-auth/react";
import { showToast } from '@/components/Alerts/CustomToast'

const Checkout = () => {
  const session = useSession();
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      localStorage.setItem("showLogInRequiredForPayment", "true");
      window.location.href = "/pages/account/login";
    }
  }, [session]);

  useEffect(() => {
    const showCartEmptyToast = localStorage.getItem("showMissingDataCheckoutForm");
    if (showCartEmptyToast === "true") {
      showToast(
        "Please complete the purchase form before completing the transaction.",
        "info"
      );
      localStorage.removeItem("showMissingDataCheckoutForm");
    }
  }, []);

  const handleOpenning = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shopping-cart-container">
      <div className="your-cart-container">
        <div className="list-your-cart-container">
        <CheckoutForm/>
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
  );
};

export default Checkout;
