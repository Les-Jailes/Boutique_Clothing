import React from "react";
import '@/css/Cart/OrderSummary.css'
import PropTypes from 'prop-types'

const OrderSummary = ({
  quantityProducts,
  totalProducts,
  taxes,
  delivery,
  total,
  currency,
  isOpen
}) => {
  return (
    <div className={ `order-summary-container ${ isOpen ? 'active' : '' }` }>
      <h2 className="order-summary-title">Order Summary</h2>
      <div className="total-products-section order-summary-section">
        <p className="order-summary-name-section">
          {` ${quantityProducts} ${quantityProducts > 1 ? "items" : "item"} `}
        </p>
        <p className="order-summary-total-section">
          {`${totalProducts} ${currency}`}
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


OrderSummary.propTypes = {
  quantityProducts: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  taxes: PropTypes.number.isRequired,
  delivery: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default OrderSummary;
