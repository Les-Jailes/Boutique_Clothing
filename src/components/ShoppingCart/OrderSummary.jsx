import React, { useContext } from "react";
import { CartContext } from "../Products/CartContext";
import '@/css/Cart/OrderSummary.css'

const OrderSummary = () => {
  const { cart } = useContext(CartContext);

  const {
    totalProducts,
    totalIndividual,
    taxes,
    delivery,
    total,
    currency,
    isOpen,
  } = cart;
  return (
    <div className={ `order-summary-container ${ isOpen ? 'active' : '' }` }>
      <h2 className="order-summary-title">Order Summary</h2>
      <div className="total-products-section order-summary-section">
        <p className="order-summary-name-section">
          {` ${totalProducts} ${totalProducts > 1 ? "items" : "item"} `}
        </p>
        <p className="order-summary-total-section">
          {`${totalIndividual} ${currency}`}
        </p>
      </div>
      <div className="tax-products-section order-summary-section">
        <p className="order-summary-name-section">Sales taxes</p>
        <p className="order-summary-total-section">{`${taxes} ${currency}`}</p>
      </div>
      <div className="delivery-products-section order-summary-section">
        <p className="order-summary-name-section">Delivery</p>
        <p className="order-summary-total-section">
          {delivery > 0 ? `${delivery} ${currency}` : "Free"}
        </p>
      </div>
      <div className="total-order-section order-summary-section">
        <p className="order-summary-name-section">TOTAL</p>
        <p className="order-summary-total-section">
          {`${total} ${currency}`}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;