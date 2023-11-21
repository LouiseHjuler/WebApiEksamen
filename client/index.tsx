import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { LoginButton, LoginCallback } from "./login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import FrontPage from "./frontpage.tsx";

const GOOGLE_CLIENT_ID =
  "165374536588-0odh4etu62sr5dgq6kdl207ovddbtotd.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ChatClient />);

export function ChatClient() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login/callback"} element={<LoginCallback />} />
        <Route path={"/home"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <></>;
}
