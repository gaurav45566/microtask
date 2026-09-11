import React, { useEffect, useState } from "react";

const STORAGE_KEY = "mf-cart-items";

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #eee",
  padding: "10px 0",
  maxWidth: "500px",
};

const removeBtnStyle = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: items }));
}

export default function CartList() {
  const [items, setItems] = useState(loadCart);

    useEffect(() => {
    console.log("[Cart] Component mounted, reloading from storage");
    setItems(loadCart());

    const handleUpdate = (e) => {
      console.log(" [Cart] cart-updated received:", e.detail);
      setItems(e.detail);
    };
    window.addEventListener("cart-updated", handleUpdate);
    return () => window.removeEventListener("cart-updated", handleUpdate);
  }, []);

  const handleRemove = (cartId) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.cartId !== cartId);
      saveCart(next);
      return next;
    });
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 && <p>Cart is empty. Add some products!</p>}
      {items.map((item) => (
        <div style={rowStyle} key={item.cartId}>
          <div>
            <strong>{item.name}</strong>
            <div>₹{item.price}</div>
          </div>
          <button style={removeBtnStyle} onClick={() => handleRemove(item.cartId)}>
            Remove
          </button>
        </div>
      ))}
      {items.length > 0 && (
        <h3 style={{ maxWidth: "500px" }}>Total: ₹{total}</h3>
      )}
    </div>
  );
}