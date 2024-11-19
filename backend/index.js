const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./routes/auth.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

// connecte with mongoDb
// Agadir2024
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connecté");
  })
  .catch((err) => console.log(err));

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`server tournant sur le port ${Port}`);
});
