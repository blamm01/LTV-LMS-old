"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Modules
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path = __importStar(require("path"));
const hbs_1 = __importDefault(require("hbs"));
const config_1 = __importDefault(require("config"));
// Import Routes
const auth_1 = __importDefault(require("./routes/auth"));
// Config Variables
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const PORT = config_1.default.get("client.port");
// Config Application
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
// Config View Engine (HandleBars)
hbs_1.default.registerPartials(__dirname + "/views/partials", () => { });
hbs_1.default.localsAsTemplateData(app);
// Use Middlewares
app.use((0, cookie_parser_1.default)());
// Handle Routes
app.use("/assets/", express_1.default.static(path.join(__dirname, "assets")));
app.use("/auth/", auth_1.default);
// Start the Server
server.listen(PORT, undefined, undefined, () => {
    console.log("Server is listening on port " + PORT);
});
