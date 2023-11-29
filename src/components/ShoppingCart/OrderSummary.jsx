import React, { useContext } from "react";
import { CartContext } from "../Products/CartContext";
import '@/css/Cart/OrderSummary.css'

const OrderSummary = ({ isOpen }) => {
  const { cart } = useContext(CartContext);

  const {
    totalProducts,
    taxes,
    delivery,
    total,
    currency
  } = cart;

  const individualTotal = cart.products.reduce(
    (accumulator, product) => accumulator + product.quantity * parseFloat(product.price),
    0
  );

  return (
    <div className={ `order-summary-container ${ isOpen ? 'active' : '' }` }>
      <h2 className="order-summary-title">Order Summary</h2>
      <div className="total-products-section order-summary-section">
        <p className="order-summary-name-section">
          {` ${totalProducts} ${totalProducts > 1 ? "items" : "item"} `}
        </p>
        <p className="order-summary-total-section">
          {`${individualTotal.toFixed(2)} ${currency}`}
        </p>
      </div>
      <div className="tax-products-section order-summary-section">
        <p className="order-summary-name-section">Sales taxes</p>
        <p className="order-summary-total-section">{`${taxes.toFixed(2)} ${currency}`}</p>
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
          {`${(total + taxes).toFixed(2)} ${currency}`}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;