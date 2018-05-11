"use strict";

import express from "express";
import routes from "./src/routes/RoutesConfig";
import { dbConfigure } from "./src/dbconfig/config";
import middleWare from "./src/middleware/config";
import envConfig from "./src/config/config.js";

const app = express();
const admin = express();

const dev = "development";
const env = process.env.NODE_ENV || dev;

envConfig(env);
dbConfigure(env);
middleWare(app, admin);
routes(app);

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.status(200).json({
    port: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
  });
  //res.end(app.get('env'));
});

app.get("/load-view", function(req, res) {
  res.render("index", {
    title: "Hey",
    message: "Hello there!, render the view from view template"
  });
});

admin.get("/", (req, res) => {
  console.log(`admin mountpath path: ${admin.mountpath}`);
  res.send("welcome to admin page");
});

app.listen(process.env.PORT, () => {
  console.log(`server running @ port ${process.env.PORT}`);
});

// export for supertest
export default app;
