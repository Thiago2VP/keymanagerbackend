import dotenv from "dotenv";
// import { resolve } from "path";

import "./database";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import homeRoutes from "./routes/home";
import tokenRoutes from "./routes/token";

dotenv.config();

const whiteList = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/tokens/", tokenRoutes);
  }
}

export default new App().app;
  