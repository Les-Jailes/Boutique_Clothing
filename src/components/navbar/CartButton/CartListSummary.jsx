import React from "react";
import CartCardSummary from "./CartCardSummary";
import products from "@/utils/ExampleSummary.json";

const CartListSummary = ({ isOpen }) => {
  console.log(products);

  return (
    <div className={`list-cart-summary ${isOpen ? "is-open" : ""}`}>
      <div className="list-products">
        {products.map((product, index) => {
          <CartCardSummary
            name={product.name}
            category={product.category}
            image={product.image}
            price={product.price}
						key={index}
          />;
        })}
      </div>
      <a href="" className="go-cart-page">
        View all products
      </a>
    </div>
  );
};

export default CartListSummary;
