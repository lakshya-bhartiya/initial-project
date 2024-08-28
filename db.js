const mongoose = require("mongoose");

const DB_URL =
  "mongodb+srv://lakshyabhartiya77:8ASyPpeOz9quBDWd@database-server.mlc9t2n.mongodb.net/admin-user";

mongoose
  .connect(DB_URL)
  .then((dbres) => {
    console.log(" DataBase connected");
  })
  .catch((error) => {
    console.log("error", error);
  });