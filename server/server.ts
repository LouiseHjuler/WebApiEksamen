import express from "express";
import dotenv from "dotenv";
import * as path from "path";
import { getJson, postJson } from "../fetchHelper";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

app.use(async (request, response, next) => {
  const access_token = cookieParser.signedCookie(
    request.signedCookies["access_token"],
    process.env.COOKIE_PARSER_SECRET!
  );

  if (access_token) {
    const { userinfo_endpoint } = await getJson(
      "https://accounts.google.com/.well-known/openid-configuration"
    );

    const userInfo = await fetch(userinfo_endpoint, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    (request as any).userInfo = await userInfo.json();
  }
  next();
});

app.post("/api/login", (request, response) => {
  const { access_token } = request.body;
  response.cookie("access_token", access_token, { signed: true });
  response.sendStatus(204);
});

app.get("/api/user", (request: any, response) => {
  response.json(request.userInfo);
});

app.get("/home", (request: any, response) => {
  if (!request.userInfo) {
    return response.send(200);
  }
});

app.listen(process.env.PORT || 3000);
