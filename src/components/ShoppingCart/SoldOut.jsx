import React from 'react';
import '@/css/Cart/SoldOut.css';

const SoldOut = (reducible) => {
  return (
    <div className="sold-out-container">
      
      {(reducible.reducible ? <p className="sold-out">LIMITED STOCK</p> : <p className="sold-out">SOLD OUT</p>)}
    </div>
  );
};

export default SoldOut;