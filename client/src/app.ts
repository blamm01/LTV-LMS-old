// Import Modules
import express from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import * as path from "path";
import hbs from "hbs";
import config from "config";

// Import Routes
import auth from "./routes/auth"

// Config Variables
const app = express();
const server = createServer(app);
const PORT: number = config.get("client.port") as number;

// Config Application
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Config View Engine (HandleBars)
hbs.registerPartials(__dirname + "/views/partials", () => {});
hbs.localsAsTemplateData(app);

// Use Middlewares
app.use(cookieParser());

// Handle Routes
app.use("/assets/", express.static(path.join(__dirname, "assets")));
app.use("/auth/", auth)

// Start the Server
server.listen(PORT, undefined, undefined, () => {
  console.log("Server is listening on port " + PORT);
});
