import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/home.jsx"; // tu Home.jsx

// Función para esperar a que carguen los scripts de Google
const waitForGoogleScripts = () => {
  return new Promise((resolve) => {
    const check = () => {
      if (window.google && window.gapi) {
        console.log("✅ Google API y GSI listos");
        resolve();
      } else {
        console.warn("⏳ Esperando que carguen los scripts de Google...");
        setTimeout(check, 300);
      }
    };
    check();
  });
};

const rootElement = document.getElementById("app");

// Esperar a que los scripts de Google estén listos antes de montar React
if (rootElement) {
  waitForGoogleScripts().then(() => {
    createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </React.StrictMode>
    );
  });
}


