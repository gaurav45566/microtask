import React from "react";
import { Link } from "react-router-dom";

const navStyle = {
  display: "flex",
  gap: "20px",
  padding: "16px 24px",
  background: "#111827",
  marginBottom: "20px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "600",
};

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <Link style={linkStyle} to="/products">
        Products
      </Link>
      <Link style={linkStyle} to="/cart">
        Cart
      </Link>
    </nav>
  );
}