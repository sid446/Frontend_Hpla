import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import Router from "./router/router";

import "./index.css";
import { MemberProvider } from "./context/memberContext";
import OtherMemberContext, { OtherMemberProvider } from "./context/otherMemberContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <OtherMemberProvider>
  <MemberProvider>
  <StrictMode>
    <Router />
  </StrictMode>
  </MemberProvider>
  </OtherMemberProvider>
);
