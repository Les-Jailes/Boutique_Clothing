import React from "react";
import style from "@/css/OrderHistoryUser/GoToProductsDetails.module.css"

const GoToProductsDelails = () => {
  return (
    <div className={style.container}>
      <h1 className={style.container__top}>You did not buy any product!</h1>
      <p className={style.container__message}>Please go see the products in our store to purchase.</p>
      <a href="/pages/products">
        <button className={style.container__button}>See Products</button>
      </a>
    </div>
  );
};

export default GoToProductsDelails;