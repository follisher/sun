import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./index.css";

export enum FetchState {
  Pending,
  Processing,
  Success,
  Fail,
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
