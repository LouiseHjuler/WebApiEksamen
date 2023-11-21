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

app.get("/api/hello", function (request, response) {
  response.send("World");
});

app.use(async (request: any, response, next) => {
  const authorization = request.header("Authorization");
  if (authorization) {
    const { userinfo_endpoint } = await getJson(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    request.userInfo = await postJson(userinfo_endpoint, {
      headers: { authorization },
    });
  }
  next();
});

app.post("/api/login", (request, response) => {
  const { access_token } = request.body;
  response.cookie("access_token", access_token, { signed: true });
  response.sendStatus(204);
});

app.get("/profile", (request: any, response) => {
  if (!request.userInfo) {
    return response.send(200);
  }
});

app.listen(process.env.PORT || 3000);
