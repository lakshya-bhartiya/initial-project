const express = require("express")
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = require("./api/route")
app.use("/" , router)
require("./db")

module.exports = app