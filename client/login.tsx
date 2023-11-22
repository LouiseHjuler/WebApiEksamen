import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJson } from "../fetchHelper";
import { Button } from "@mui/material";

export function LoginButton() {
  const [authorizationUrl, setAuthorizationUrl] = useState("");
  async function generateAuthorizationUrl() {
    // Get the location of endpoints from Google
    const { authorization_endpoint } = await getJson(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    // Tell Google how to authentication
    const parameters = {
      response_type: "token",
      client_id:
        "165374536588-0odh4etu62sr5dgq6kdl207ovddbtotd.apps.googleusercontent.com",
      // Tell user to come back to http://localhost:3000/callback when logged in
      redirect_uri: window.location.origin + "/login/callback",
      scope: "profile email",
    };
    setAuthorizationUrl(
      authorization_endpoint + "?" + new URLSearchParams(parameters)
    );
  }

  useEffect(() => {
    generateAuthorizationUrl();
  }, []);

  return (
    <Button
      href={authorizationUrl}
      type="submit"
      fullWidth
      variant="contained"
      sx={{ my: 5 }}>
      Log in with Google
    </Button>
  );
}

export function LoginCallback() {
  const navigate = useNavigate();
  const callbackParameters = Object.fromEntries(
    new URLSearchParams(window.location.hash.substring(1))
  );

  async function handleCallback() {
    // Get the tokens from google
    const { access_token } = callbackParameters;
    await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ access_token }),
      headers: {
        "content-type": "application/json",
      },
    });
    localStorage["access_token"] = access_token;
    navigate("/home");
  }

  useEffect(() => {
    handleCallback();
  }, []);

  return <div>this'll take just a moment</div>;
}
