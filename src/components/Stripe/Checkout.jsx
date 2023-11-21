"use client";
import React, { useState, useContext, useEffect } from "react";
import "@/css/StripeStyles/Checkout.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "@/app/api/api";
import { CartContext } from "@/components/Products/CartContext";
import Swal from "sweetalert2";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "white",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "18px",
      "::placeholder": {
        color: "#aab7c4",
      },
      border: "1px solid black",
      padding: "12px",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CheckoutPayment() {
  const { cart, clearCart, isCartLoaded } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();

  const [shippingInfo, setShippingInfo] = useState(null);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("shippingInfo"));
    if (info) {
      setShippingInfo(info);
    }
  }, []);

  useEffect(() => {
    if (isCartLoaded && cart.totalProducts === 0) {
      setTimeout(() => {
        localStorage.setItem("showCartEmptyToast", "true");
        window.location.href = "/pages/products";
      }, 500);
    }
  }, [cart.totalProducts, isCartLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(shippingInfo);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: shippingInfo.fullname,
        phone: shippingInfo.phoneNumber,
        email: shippingInfo.email,
        address: {
          line1: shippingInfo.streetAddress,
          postal_code: shippingInfo.zipCode,
          country: shippingInfo.country,
        },
      },
    });

    if (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!error) {
      const { id: paymentMethodId } = paymentMethod;

      const checkoutData = {
        paymentMethodId,
        amount: cart.total + cart.taxes,
        billingDetails: {
          fullname: shippingInfo.fullname,
          phoneNumber: shippingInfo.phoneNumber,
          email: shippingInfo.email,
          address: {
            line1: shippingInfo.streetAddress,
            postal_code: shippingInfo.zipCode,
            country: shippingInfo.country,
          },
        },
      };

      await api
        .post("/CheckoutPayment", checkoutData)
        .then((response) => {
          if (response.data.requiresAction) {
            window.location.href = "/pages/checkout/payment";
          } else {
            localStorage.removeItem("shippingInfo");
            Swal.fire({
              title: "Payment Successful!",
              text: "Thank you for your preference.",
              icon: "success",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/";
                clearCart();
              }
            });
          }
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || "Unknown error occurred";
          Swal.fire({
            title: "Payment Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Shipping Information</h2>
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
}

export default CheckoutPayment;
