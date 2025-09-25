import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./css/global.css";
import "./css/forms.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
