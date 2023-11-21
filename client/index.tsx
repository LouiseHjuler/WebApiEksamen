import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { LoginButton, LoginCallback } from "./login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const GOOGLE_CLIENT_ID =
  "165374536588-0odh4etu62sr5dgq6kdl207ovddbtotd.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ChatClient />);

export function ChatClient() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<LoginButton />} />
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login/callback"} element={<LoginCallback />} />
        <Route path={"/home"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

function FrontPage() {
  return <></>;
}
function Home() {
  return <></>;
}
