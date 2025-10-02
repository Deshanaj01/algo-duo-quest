import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // remove this if you don’t have index.css
const container = document.getElementById('root');

//const root = ReactDOM.createRoot(document.getElementById("root"));
if (!container) {
  throw new Error('Root element not found. Did you forget to add it to your index.html?');
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);