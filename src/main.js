import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element not found. Make sure the element with id 'root' exists in your HTML.");
}
createRoot(rootElement).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
