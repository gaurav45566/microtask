import React from "react";
import { createRoot } from "react-dom/client";
import CartList from "./CartList";

const root = createRoot(document.getElementById("root"));
root.render(
  <div style={{ padding: "20px" }}>
    <h2>Cart App (Standalone Mode)</h2>
    <CartList />
  </div>
);