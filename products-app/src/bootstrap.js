
import React from "react";
import { createRoot } from "react-dom/client";
import ProductsList from "./ProductsList";
 
const root = createRoot(document.getElementById("root"));
root.render(
  <div style={{ padding: "20px" }}>
    <h2>Products App (Standalone Mode)</h2>
    <ProductsList />
  </div>
);
 