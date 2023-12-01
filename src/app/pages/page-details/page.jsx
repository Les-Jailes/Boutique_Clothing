'use client'

import api from "@/app/api/api";
import Product from "@/components/ProductDetail/Product";
import React, { useEffect, useState } from "react";
import '@/css/ProductDetail/ProductPage.css'
import OtherRecomendations from "@/components/ProductDetail/OtherRecomendations"; 
import Loader from "@/utils/Loader"; 

export default function Page() {
  const [id, setId] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";

    if (isBrowser) {
      const { search } = window.location;
      const params = new URLSearchParams(search);
      const productId = params.get("id");

      setId(productId);
    }
  }, []);

  useEffect(() => {
    if (id !== null) {
      getProduct();
    }
  }, [id]);

  const getProduct = async () => {
    try {
      const response = await api.get(`/Product/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
			window.location.href = '/pages/products';
    }
  };

  return (
    <div className="product-page">
      {loading ? (
        <Loader isLoaderVisible={loading} />
      ) : (
        <>
          {product ? (
            <><Product product={product} /><OtherRecomendations category={product.category} productId={id} /></>
          ) : (
            "Product details not available"
          )}
        </>
      )}
    </div>
  );
}
