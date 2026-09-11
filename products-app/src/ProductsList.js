import React, { useState, useRef } from "react";

const dummyProducts = [
  { id: 1, name: "Wireless Mouse", price: 499 },
  { id: 2, name: "Mechanical Keyboard", price: 2499 },
  { id: 3, name: "USB-C Hub", price: 899 },
  { id: 4, name: "Laptop Stand", price: 1299 },
  { id: 5, name: "Noise Cancelling Headphones", price: 4999 },
];

const toastStyle = {
  position: "fixed",
  bottom: "24px",
  right: "24px",
  background: "#16a34a",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  fontWeight: "600",
  zIndex: 9999,
  transition: "opacity 0.3s ease",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  margin: "10px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "500px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const buttonStyle = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default function ProductsList() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const handleAddToCart = (product) => {
    // Cross-microfrontend communication via a window CustomEvent.
    // The Cart microfrontend listens for this event (see cart-app/src/CartList.js)
    window.dispatchEvent(
      new CustomEvent("add-to-cart", { detail: product })
    );

    // Show toast for 2 seconds
    setToast(`${product.name} added to cart!`);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(null), 2000);
  };

  return (
    <div>
      <h2>Products</h2>
      {dummyProducts.map((product) => (
        <div style={cardStyle} key={product.id}>
          <div>
            <strong>{product.name}</strong>
            <div>₹{product.price}</div>
          </div>
          <button style={buttonStyle} onClick={() => handleAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
      {toast && <div style={toastStyle}>✅ {toast}</div>}
    </div>
  );
}