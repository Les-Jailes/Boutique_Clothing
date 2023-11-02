'use client'

import "@/css/Products/ClotheCard.css"
import { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai"
import { useState } from "react"
import { ColorClothe } from "./ColorClothe"

export const ClotheCard = ({ clothe }) => {

  const [ isLiked, setIsLiked ] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="clothe-card-container">
      <div className={ `card-image-section ${ clothe.category.toLowerCase() }` }>
        <img
          src={clothe.path[0]}
          alt="Clothe image"
          className="clothe-image"
          draggable="false"
        />
      </div>
      <div className="information-container">
        <div className="section-card clothe-information">
          <h3 className="clothe-name">{clothe.name}</h3>
          <p className="clothe-price">{clothe.price} $</p>
        </div>
        <div className="section-card colors-container">
          {
            clothe.color.map((color, index) => (
              <ColorClothe key={ index } color={ color } />
            ))
          }
        </div>
        <div className="section-card card-buttons">
          <button 
            className="options-card like-card"
            onClick={ () => handleLike() }
          >
            {
              !isLiked ?
              <AiOutlineHeart color="red" />
              :
              <AiFillHeart color="red" />
            }
          </button>
          <button className="options-card shop-card">
            <AiOutlineShoppingCart color="white" />
          </button>
        </div>
      </div>
    </div>
  )
}