const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
//Register a user

const registerUser = asyncHandler (async (req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password) {
        res.status(400)
        throw new Error("Username, email and password are mandatory !!!")
    }
    const userPresent = await User.findOne({email})
    if(userPresent) {
        res.status(400)
        throw new Error("User is already registered")
    }

    const encrypted_pass = await bcrypt.hash(password, 11)
    console.log("Encrypted password : ",encrypted_pass)
    
    const user = await User.create({
        username,
        email,
        password: encrypted_pass
    })
    console.log(`USer is created ${user}`)
    if(user) {
        res.status(201).json({_id: user.id, email: user.email})
    }
    else{
        res.status(400)
        throw new Error("User data is invalid")
    }

    res.json({message : "Register the user"})
});

//login user

const loginUser = asyncHandler (async (req, res) => {
    res.json({message : "Login the user"})
});

//get current user

const currentUser =asyncHandler (async (req, res) => {
    res.json({message : "Get current user information"})
})

module.exports = { registerUser, loginUser, currentUser}