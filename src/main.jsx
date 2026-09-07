import React from "react";
import { createRoot } from "react-dom/client";
import A10Academy from "./A10Academy.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <A10Academy />
  </React.StrictMode>
);
