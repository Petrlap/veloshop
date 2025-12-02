import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import "./app/index.css";
import SeoProvider from "./app/providers/SeoProvider";

const container = document.getElementById("root");

if (!container) {
  throw new Error(
    "Root element not found. Ensure there is a <div id='root'></div> in index.html"
  );
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <SeoProvider>
        <App />
      </SeoProvider>
    </BrowserRouter>
  </StrictMode>
);
