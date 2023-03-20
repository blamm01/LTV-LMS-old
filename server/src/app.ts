// Import Modules
import express from "express";
import cors from "cors";
import Fingerprint from "express-fingerprint";
import mongoose from "mongoose";
import * as useragent from "express-useragent";
import { createServer, request } from "http";
import * as requestIp from "request-ip";
import helmet from "helmet";
import config from "config";
import { EError } from "./typings/error";
import { Request } from "./typings/express";

// Config Variables
const app = express();
const PORT: number = config.get("server.port") as number;
const mongoURI = config.get("db.uri") as string;
const server = createServer(app);

// Config Application
app.set("trust proxy", "loopback");

// Use Middlewares
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(Fingerprint());
app.use(helmet());
app.use(cors());
app.use(useragent.express());
app.use(function (req: Request, res, next) {
  req.ipAddr = requestIp.getClientIp(req) || req.ip
  next();
});
app.use(function (req, res, next) {
  console.log(
    `[${new Date().toUTCString()}] {${req.ip}} ${req.method.toUpperCase()} ${
      req.path
    }`
  );
  next();
});

// Start the Server
if (!mongoURI) throw new EError("No Mongo URI provided!", "NO_MONGO_URI");
mongoose.set("strictQuery", true);
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, undefined, undefined, () => {
      console.log("Server is listening on port " + PORT);
    });
  })
  .catch((err) => console.log(err));
