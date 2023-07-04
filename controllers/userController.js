const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Register a user

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Username, email and password are mandatory !!!");
  }
  const userPresent = await User.findOne({ email });
  if (userPresent) {
    res.status(400);
    throw new Error("User is already registered");
  }

  const encrypted_pass = await bcrypt.hash(password, 11);
  console.log("Encrypted password : ", encrypted_pass);

  const user = await User.create({
    username,
    email,
    password: encrypted_pass,
  });
  console.log(`USer is created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is invalid");
  }

  res.json({ message: "Register the user" });
});

//login user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Username and password are mandatory !!!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "17m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid credetials !!!");
  }
});

//get current user

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
