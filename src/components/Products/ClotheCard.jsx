"use client";

import "@/css/Products/ClotheCard.css";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Image from 'next/image';
import { useState, useEffect, useRef, useContext } from "react";
import { ColorClothe } from "./ColorClothe";
import { SizePopup } from "@/utils/SizePopup";
import { CartContext } from "./CartContext";
import { useSession } from 'next-auth/react';
import api from "@/app/api/api";

export const ClotheCard = ({ clothe }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSizePopupOpen, setIsSizePopupOpen] = useState(false);
  const cardRef = useRef(null);
  const { addToCart } = useContext(CartContext);
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') {
      api.get('/User/email/' + session.data.user.email)
        .then(response => {
          const user = response.data;
          const wishlist = user.wishlist;
          const isProductInWishlist = wishlist.includes(clothe._id);
          setIsLiked(isProductInWishlist);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [session.status, clothe._id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if(session.status === 'authenticated'){
      if(!isLiked) addToDB();
      else removeFromDB();
    } 
  };

  const addToDB = async () => {
    try{
      const user = await api.get('/User/email/' + session.data.user.email);
    const products = user.data.wishlist;
    products.push(clothe._id);
    const body = {
      wishlist: products
    }
    await api.put('/User/' + user.data._id, body);
    console.log(body);
    }
    catch(error){
      console.log(error);
    }
    
  }

  const removeFromDB = async () => {
    try {
      const user = await api.get('/User/email/' + session.data.user.email);
      const products = user.data.wishlist;
  
      const updatedWishlist = products.filter((productId) => productId !== clothe._id);
  
      const body = {
        wishlist: updatedWishlist
      };
  
      await api.put('/User/' + user.data._id, body);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = (selectedSize) => {
    addToCart({
      ...clothe,
      size: selectedSize,
    });
  };

  const handleSizeSelection = (size) => {
    setIsSizePopupOpen(!isSizePopupOpen);
    if (size) {
      handleAddToCart(size);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target) && isSizePopupOpen) {
        setIsSizePopupOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSizePopupOpen]);

  return (
    <div className="clothe-card-container">
      <div className={`card-image-section ${clothe.category.toLowerCase()}`}>
        <Image
          src={clothe.path[0]}
          alt="Clothe image"
          className="clothe-image"
          draggable={ false }
          width={400}
          height={400}
        />
      </div>
      <div className="information-container">
        <div className="section-card clothe-information">
          <h3 className="clothe-name">{clothe.name}</h3>
          <p className="clothe-price">{clothe.price} $</p>
        </div>
        <div className="container-more-information-and-buttons">
          <div className="section-card colors-container">
            {clothe.color.map((color, index) => (
              <ColorClothe key={index} color={color} />
            ))}
          </div>
          <div className="section-card card-buttons">
            <button
              className="options-card like-card"
              onClick={() => handleLike()}
            >
              {!isLiked ? (
                <AiOutlineHeart color="red" />
              ) : (
                <AiFillHeart color="red" />
              )}
            </button>
            <button
              ref={cardRef}
              className="options-card shop-card"
              onClick={() => {handleSizeSelection();}}
            >
              <AiOutlineShoppingCart color="white" />
            </button>
          </div>
          {isSizePopupOpen && (
            <SizePopup
              handleSizeSelection={handleSizeSelection}
              sizes={clothe.sizes}
              isSizePopupOpen={isSizePopupOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};