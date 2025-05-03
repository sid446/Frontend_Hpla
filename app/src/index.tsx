import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import Router from "./router/router";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Router />
  </StrictMode>
);
