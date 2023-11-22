import React from 'react';
import '@/css/Cart/SoldOut.css';

const SoldOut = ({reducible, fixed}) => {

  const getText = () => {
    return reducible ? 'LIMITED STOCK' : 'SOLD OUT';
  }

  const text = getText();

  return (
    <div className="sold-out-container">
      <p className={`sold-out  ${fixed ? 'fixed' : ''}`}>{text}</p>
    </div>
  );
};

export default SoldOut;