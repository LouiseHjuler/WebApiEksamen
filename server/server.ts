import express from "express";
import dotenv from "dotenv";
import * as path from "path";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
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

app.use(async (request: any, response, next) => {
  const { username, access_token } = request.signedCookies;
  if (access_token) {
    const res = await fetch(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    const discoveryDoc = await res.json();

    const userinfoRes = await fetch(discoveryDoc.userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!userinfoRes.ok) {
      response.clearCookie("access_token");
      response.sendStatus(401);
      return;
    }
    const userinfo = await userinfoRes.json();

    request.userInfo = { ...userinfo, username: userinfo.email };
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

app.get("/api/chats", async (request, response) => {
  const client = new MongoClient(process.env.ATLAS_URL!);
  const connection = await client.connect();
  const collection = connection.db("Chat").collection("Chats");
  const chats = await collection
    .find({ userId: (request as any).userInfo.sub })
    .toArray();
  response.json(chats);
});

app.post("/api/createChat", async (request, response) => {
  const client = new MongoClient(process.env.ATLAS_URL!);
  const connection = await client.connect();
  const database = connection.db("Chat");
  const { title } = request.body;
  await database.collection("Chats").insertOne({
    userId: (request as any).userInfo.sub,
    title: title,
    chatters: [(request as any).userInfo.sub],
  });
});

app.listen(process.env.PORT || 3000);
