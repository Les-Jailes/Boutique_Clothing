import React from 'react';
import '@/css/Cart/SoldOut.css';

const SoldOut = ({reducible, fixed}) => {
  return (
    <div className={`sold-out-container ${fixed ? 'fixed' : ''}`}>
      
      {(reducible ? <p className="sold-out">LIMITED STOCK</p> : <p className="sold-out">SOLD OUT</p>)}
    </div>
  );
};

export default SoldOut;