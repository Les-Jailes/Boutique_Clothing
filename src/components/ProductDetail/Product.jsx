"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import ProductCarousel from "./ProductCarousel";
import CarouselOption from "./CarouselOption";
import ProductSize from "./ProductSize";
import ProductColor from "./ProductColor";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ProductDetails from "./ProductDetails";
import "@/css/ProductDetail/Product.css";
import PropTypes from "prop-types";
import { CartContext } from "../Products/CartContext";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import api from "@/app/api/api";
import Loader from "@/utils/Loader";
import {
  showAlertMessageAutomatically,
  showErrorMessage,
} from "@/utils/alerts";

const Product = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(false);

  const { addToCart } = useContext(CartContext);

  const [size, setSize] = useState("");

  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      let wishlist = [];
      if (localStorage.getItem("wishlist")) {
        wishlist = JSON.parse(localStorage.getItem("wishlist"));
      }
      const isProductInWishlist = wishlist.find((u) => u._id === product._id);
      setIsLiked(isProductInWishlist);
      api
        .get("/User/email/" + session.data.user.email)
        .then((response) => {
          const user = response.data;
          const wishlist = user.wishlist;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [session.status, product]);

  const handleLike = () => {
    if (session.status === "authenticated") {
      setIsLogged(true);
      setIsLoading(true);
      if (!isLiked) addToWishList();
      else removeFromWishList();
    } else {
      setIsLogged(false);
      showAlertMessageAutomatically(
        "You need to be logged in to add products to your wish list."
      );
    }
  };

  const addToWishList = async () => {
    let wishlist = [];
    if (localStorage.getItem("wishlist")) {
      wishlist = JSON.parse(localStorage.getItem("wishlist"));
    }

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    try {
      const user = await api.get("/User/email/" + session.data.user.email);
      const products = user.data.wishlist;
      products.push(product);
      const body = {
        wishlist: products,
      };
      await api.put("/User/" + user.data._id, body);
    } catch (error) {
      console.log(error);
    }
    setIsLiked(true);
    setIsLoading(false);
  };

  const removeFromWishList = async () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));

    wishlist = wishlist.filter((p) => p._id !== clothe._id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    try {
      const user = await api.get("/User/email/" + session.data.user.email);
      const products = user.data.wishlist;

      const updatedWishlist = products.filter(
        (product) => product._id !== clothe._id
      );

      const body = {
        wishlist: updatedWishlist,
      };

      await api.put("/User/" + user.data._id, body);
    } catch (error) {
      console.error(error);
    }
    setIsLiked(false);
    setIsLoading(false);
  };

  const handleChangeSize = (newSize) => {
    setSize(newSize);
  };

  const handleAddToCart = () => {
    if (size !== "") {
      addToCart({
        ...product,
        size: size,
      });
      setSize("");
      location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please choose a size",
      });
    }
  };

  useEffect(() => {
    if (product.path.length > 1) {
      setRightButton(true);
    }
  }, [product.path.length]);

  const handleCurrentPosition = useCallback(
    (position) => {
      setCurrentPosition(position);
      setLeftButton(position > 0);
      setRightButton(position < product.path.length - 1);
    },
    [product.path.length]
  );

  const handleLeftPosition = useCallback(() => {
    let leftPosition = currentPosition - 1;
    setLeftButton(leftPosition > 0);
    setRightButton(true);
    setCurrentPosition(leftPosition);
  }, [currentPosition]);

  const handleRightPosition = useCallback(() => {
    let rightPosition = currentPosition + 1;
    setLeftButton(true);
    setRightButton(rightPosition < product.path.length - 1);
    setCurrentPosition(rightPosition);
  }, [currentPosition, product.path.length]);

  return (
    <div className="product-detail-container">
      {isLoading && <Loader isLoaderVisible={isLoading}/>}
      <div className="left-product-detail-container">
        <ProductCarousel
          product={product}
          currentPosition={currentPosition}
          handleLeftPosition={handleLeftPosition}
          handleRightPosition={handleRightPosition}
          leftStatus={leftButton}
          rightStatus={rightButton}
        />
        <div className="options-carousel-product-image">
          {product.path && product.path.length > 0
            ? product.path.map((image, index) => {
                return (
                  <CarouselOption
                    category={product.category}
                    image={image}
                    key={index}
                    position={index}
                    currentPosition={currentPosition}
                    handlePosition={handleCurrentPosition}
                  />
                );
              })
            : "No options"}
        </div>
      </div>
      <div className="right-product-detail-container">
        <h2 className="clothe-name-product-detail">{product.name}</h2>
        <p className="clothe-price-product-detail">{product.price} $</p>
        <ProductSize
          sizes={product.sizes}
          currentSize={size}
          handleChangeSize={handleChangeSize}
        />
        <ProductColor color={product.color} />
        <div className="options-product-detail">
          <button className="add-cart-button" onClick={handleAddToCart}>
            Add to cart
          </button>
          <button className="add-wishlist-button" onClick={() => handleLike()}>
            {!isLiked ? (
              <AiOutlineHeart color="red" />
            ) : (
              <AiFillHeart color="red" />
            )}
          </button>
        </div>
        <ProductDetails description={product.description} />
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
