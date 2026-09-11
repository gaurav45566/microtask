import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const ProductsList = React.lazy(() => import("products/ProductsList"));
const CartList = React.lazy(() => import("cart/CartList"));

const STORAGE_KEY = "mf-cart-items";

export default function App() {
  useEffect(() => {
    const handleAdd = (e) => {
      console.log("[Host] Received add-to-cart:", e.detail);
      const raw = localStorage.getItem(STORAGE_KEY);
      const items = raw ? JSON.parse(raw) : [];
      const next = [...items, { ...e.detail, cartId: Date.now() }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("cart-updated", { detail: next }));
      console.log(" [Host] Saved to localStorage:", next);
    };

    window.addEventListener("add-to-cart", handleAdd);
    return () => window.removeEventListener("add-to-cart", handleAdd);
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "0 24px" }}>
        <Suspense fallback={<div>Loading microfrontend...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/cart" element={<CartList />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}