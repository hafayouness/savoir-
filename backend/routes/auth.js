const express = require("express");
const router = express.Router();
const signup = require("../controllers/authController.js"); // Assurez-vous d'importer la fonction et non le module entier

router.post("/signup", signup);

module.exports = router;
