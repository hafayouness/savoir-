const User = require("../models/user.js");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const generatetoken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: "1y" });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "les champs tous requis" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "utulisateur est deja existant" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    console.log("Nouvel utilisateur : ", newUser);
    await newUser.save();
    const token = generatetoken(newUser._id);

    res.status(201).json({ message: "utulisateur enregistre", token });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "error lors l'enregistrement de l'utulisateur " });
  }
};

module.exports = signup;
