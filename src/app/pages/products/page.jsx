'use client'

import { ClotheCard } from "@/app/components/ClotheCard"
import '@/app/css/General.css'
import '@/app/css/ProductsPage.css'
import { useState } from "react"
import { AiFillFilter } from "react-icons/ai";

const examplesProduct = [
  {
    "name": "Producto 1",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 650,
    "category": "women",
    "colors": ['red']
  },
  {
    "name": "Producto 2",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 750,
    "category": "men",
    "colors": ['blue', 'black']
  },
  {
    "name": "Producto 3",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 450,
    "category": "boy",
    "colors": ['green', 'gray']
  },
  {
    "name": "Producto 4",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 550,
    "category": "girl",
    "colors": ['pink', 'purple', 'yellow']
  },
  {
    "name": "Producto 5",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 600,
    "category": "women",
    "colors": ['blue', 'black']
  },
  {
    "name": "Producto 6",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 800,
    "category": "men",
    "colors": ['red']
  },
  {
    "name": "Producto 7",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 500,
    "category": "boy",
    "colors": ['green', 'gray']
  },
  {
    "name": "Producto 8",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 700,
    "category": "girl",
    "colors": ['pink']
  },
  {
    "name": "Producto 9",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 750,
    "category": "women",
    "colors": ['blue']
  },
  {
    "name": "Producto 10",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 550,
    "category": "men",
    "colors": ['red', 'black']
  },
  {
    "name": "Producto 11",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 650,
    "category": "boy",
    "colors": ['green']
  },
  {
    "name": "Producto 12",
    "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
    "price": 700,
    "category": "girl",
    "colors": ['pink', 'yellow']
  }
]

export default function page() {

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenFilter = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="products-page">
      <button className={ ` button-filter-container ${ isOpen ? 'is-open' : '' } ` } onClick={ () => handleOpenFilter() }>
        <AiFillFilter color="white" />
      </button>
      <div className={ ` filter-container ${ isOpen ? 'is-open' : '' } ` }></div>
      <div className="product-container">
        {
          examplesProduct.map((exampleProduct, index) => (
            <ClotheCard key={ index } clothe={ exampleProduct } />
          ))
        }
      </div>
    </div>
  )
}
