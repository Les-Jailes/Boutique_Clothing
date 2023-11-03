"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import createPagination from "@/utils/Pagination"
import { ClotheCard } from "@/components/Products/ClotheCard"
import "@/css/Products/ProductsPage.css"
import { Pagination } from "@/components/Products/Pagination"

export default function Page() {
  const [pagination, setPagination] = useState([])
  const [products, setProducts] = useState([])
  const [currentlyPagination, setCurrentlyPagination] = useState(0)
  const [leftIsDisable, setLeftIsDisable] = useState(true)
  const [rightIsDisable, setRightIsDisable] = useState(false)

  useEffect(() => {
    axios
      .get("https://boutique-clothing-api.onrender.com/product")
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.error("Error: ", error)
      })
  }, [])

  useEffect(() => {
    setPagination(createPagination(products))
  }, [products])

  const handlePaginationRight = () => {
    let paginationNumber = currentlyPagination + 1;
    if (paginationNumber < pagination.length) {
      setCurrentlyPagination(paginationNumber);
      setLeftIsDisable(false);
    }
    if (paginationNumber === pagination.length - 1) {
      setRightIsDisable(true);
    }
  }
  
  const handlePaginationLeft = () => {
    let paginationNumber = currentlyPagination - 1;
    if (paginationNumber >= 0) {
      setCurrentlyPagination(paginationNumber);
      setRightIsDisable(false);
    }
    if (paginationNumber === 0) {
      setLeftIsDisable(true);
    }
  }

  return (
    <div className="products-page">
      <div className="product-container">
        {pagination[currentlyPagination]?.map((product, index) => (
          <ClotheCard key={index} clothe={product} />
        ))}
      </div>
      <Pagination
        currentlyPagination={currentlyPagination}
        changePaginationRight={handlePaginationRight}
        changePaginationLeft={handlePaginationLeft}
        leftIsDisable={leftIsDisable}
        rightIsDisable={rightIsDisable}
      />
    </div>
  )
}
