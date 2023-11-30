"use client";

import "@/css/Products/ClotheCard.css";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Image from "next/image";
import { useState, useEffect, useRef, useContext } from "react";
import { ColorClothe } from "./ColorClothe";
import { SizePopup } from "@/utils/SizePopup";
import { CartContext } from "./CartContext";
import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react';
import api from "@/app/api/api";
import Loader from '@/utils/Loader'
import { showAlertMessageAutomatically } from "@/utils/alerts";

export const ClotheCard = ({ clothe }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSizePopupOpen, setIsSizePopupOpen] = useState(false);
  const cardRef = useRef(null);
  const { addToCart } = useContext(CartContext);
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false); 
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (session.status === 'authenticated') {
      let wishlist = [];
      if(localStorage.getItem('wishlist')) {
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
    }
    const isProductInWishlist = wishlist.find(u => u._id === clothe._id);;
          setIsLiked(isProductInWishlist);
      api.get('/User/email/' + session.data.user.email)
        .then(response => {
          const user = response.data;
          const wishlist = user.wishlist;
          
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [session.status, clothe]);

  const handleLike = () => {
    if(session.status === 'authenticated'){
      setIsLogged(true);
      setIsLoading(true);
      if(!isLiked) addToWishList();
      else removeFromWishList();
    }
    else {
      setIsLogged(false);
      showAlertMessageAutomatically("You need to be logged in to add products to your wish list.");
    }
  };

  const addToWishList = async () => {

    let wishlist = [];
      if(localStorage.getItem('wishlist')) {
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
    }

    wishlist.push(clothe);

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
    try{
      const user = await api.get('/User/email/' + session.data.user.email);
    const products = user.data.wishlist;
    products.push(clothe);
    const body = {
      wishlist: products
    }
    await api.put('/User/' + user.data._id, body);
    }
    catch(error){
      console.log(error);
    }
    setIsLiked(true);
    setIsLoading(false);
    
  }

  const removeFromWishList = async () => {

    let wishlist = JSON.parse(localStorage.getItem('wishlist'));
  
  wishlist = wishlist.filter(p => p._id !== clothe._id);

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
    try {
      const user = await api.get('/User/email/' + session.data.user.email);
      const products = user.data.wishlist;
  
      const updatedWishlist = products.filter((product) => product._id !== clothe._id);
  
      const body = {
        wishlist: updatedWishlist
      };
  
      await api.put('/User/' + user.data._id, body);
    } catch (error) {
      console.error(error);
    }
    setIsLiked(false);
    setIsLoading(false);

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
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target) &&
        isSizePopupOpen
      ) {
        setIsSizePopupOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSizePopupOpen]);

  const handleRedirection = () => {
    let url = `/pages/page-details?id=${clothe._id}`;
    window.location.href = url;
  };

  return (
    <div className="clothe-card-container">
      {isLoading && <Loader isLoaderVisible={isLoading}/>}
      <div className={`card-image-section ${clothe.category.toLowerCase()}`} onClick={() => handleRedirection()}>
        <Image
          src={clothe.path[0]}
          alt="Clothe image"
          className="clothe-image"
          draggable={false}
          width={400}
          height={400}
        />
      </div>
      <div className="information-container">
        <div className="section-card clothe-information">
          <h3 className="clothe-name" onClick={() => handleRedirection()}>{clothe.name}</h3>
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
              onClick={handleLike}
            >
              {!isLiked ? (
                <AiOutlineHeart color="red"/>
              ) : (
                <AiFillHeart color="red" />
              )}
            </button>
            <button
              ref={cardRef}
              className="options-card shop-card"
              onClick={() => {
                handleSizeSelection();
              }}
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

ClotheCard.propTypes = {
  clothe: PropTypes.object.isRequired
}