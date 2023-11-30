'use client'

import api from "@/app/api/api";
import Product from "@/components/ProductDetail/Product";
import React, { useEffect, useState } from "react";
import '@/css/ProductDetail/ProductPage.css'

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
        "Cargando..."
      ) : (
        <>
          {product ? (
            <Product product={product} />
          ) : (
            "Detalles del producto no disponibles"
          )}
        </>
      )}
    </div>
  );
}
