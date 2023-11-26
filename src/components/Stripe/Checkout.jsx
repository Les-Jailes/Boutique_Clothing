"use client";
import React, { useState, useContext, useEffect } from "react";
import "@/css/StripeStyles/Checkout.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "@/app/api/api";
import { CartContext } from "@/components/Products/CartContext";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

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
  const session = useSession();
  const { cart, clearCart, isCartLoaded } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!redirected && session.status === "unauthenticated") {
      localStorage.setItem("showLogInRequiredForPayment", "true");
      window.location.href = "/pages/account/login";
      setRedirected(true);
    }
  }, [session, redirected]);

  useEffect(() => {
    if (
      !redirected &&
      !purchaseCompleted &&
      isCartLoaded &&
      cart.totalProducts === 0
    ) {
      setTimeout(() => {
        localStorage.setItem("showCartEmptyToast", "true");
        window.location.href = "/pages/products";
        localStorage.removeItem("shippingInfo");
        setRedirected(true);
      }, 400);
    }
  }, [cart.totalProducts, isCartLoaded, redirected, purchaseCompleted]);

  useEffect(() => {
    if (!redirected) {
      const info = JSON.parse(localStorage.getItem("shippingInfo"));
      const isShippingInfoComplete =
        info &&
        info.fullname &&
        info.phoneNumber &&
        info.email &&
        info.streetAddress &&
        info.zipCode &&
        info.country;
      if (!isShippingInfoComplete) {
        setTimeout(() => {
          localStorage.setItem("showMissingDataCheckoutForm", "true");
          window.location.href = "/pages/checkout";
          setRedirected(true);
        }, 1800);
      } else {
        setShippingInfo(info);
      }
    }
  }, [redirected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      setIsSubmitting(false);
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
        purchasedProducts: cart.products,
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
            }).finally(() => {
              window.location.href = "/";
              clearCart();
              setPurchaseCompleted(true);
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
          setIsSubmitting(false);
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
        <button type="submit" className="buy-button" disabled={isSubmitting}>
          Buy
        </button>
      </div>
    </form>
  );
}

export default CheckoutPayment;
