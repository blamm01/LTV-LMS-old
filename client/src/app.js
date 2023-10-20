const express = require("express")
const { createServer } = require("http")
const path = require("path")
const hbs = require("hbs")
const config = require("config")
const glob = require('glob')

// Config Variables
const app = express();
const server = createServer(app);
const PORT = config.get("client.local.port")

// Render Variables
const render_variables = {
  client: config.get("client"),
  server: config.get("server")
}

// Config Application
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "pages"));

// Config View Engine (HandleBars)
hbs.registerPartials(__dirname + "/pages/partials", () => { });
hbs.localsAsTemplateData(app);

// Handle Routes
app.use("/assets/", express.static(path.join(__dirname, "assets")));
app.get("/*", (req, res) => {
  res.render("index.hbs", render_variables)
})

// Start the Server
server.listen(PORT, undefined, undefined, () => {
  console.log("Server is listening on port " + PORT);
});