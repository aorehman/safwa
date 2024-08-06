// src/index.js
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { ProgressSpinner } from "primereact/progressspinner";
import "./i18n";  // Import the i18n configuration

const root = ReactDOM.createRoot(document.getElementById("root"));

const loadingMarkup = (
  <div
    className="flex justify-center items-center z-50 w-full h-full fixed top-0 left-0"
    style={{ background: "rgba(0, 0, 0, 0.5);" }}
  >
    <ProgressSpinner />
  </div>
);

root.render(
  <Suspense fallback={loadingMarkup}>
    <PrimeReactProvider value={{ unstyled: false, pt: Tailwind }}>
      <App />
    </PrimeReactProvider>
  </Suspense>
);
