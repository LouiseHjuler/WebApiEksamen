import express from "express";
import cookieParser from "cookie-parser";
import * as path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express;

app.use(express.json());
