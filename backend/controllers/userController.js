const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Add a new user to the database
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error('Please fill all fields!');
    }
    // Perform a check to see if the given user already exists in the DB
    const userExists = await User.findOne({email});
    if (userExists){
        res.status(400);
        throw new Error("The specified user already exists!");
    }
    // Password encryption
    const encryptSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, encryptSalt);
    // Create the user
    const user = await User.create({
        email,
        password: encryptedPassword,
    });
    if (user){
        res.status(201).json()({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400);
        throw new Error("Invalid data");
    }
});

// @desc Get user data 
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    // Check the user by email
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400);
        throw new Error("Invalid Credentials Entered!");
    }
});

// @desc Get user data
// @route GET /api/users/me
// @access Public
const getUserInfo = asyncHandler( async (req, res) => {
    res.json({message: "user data display"});
});

// Generate JWT token
const generateToken = (id) => {
    return jsonWebToken.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '365d'
    });
}
module.exports = {
    registerUser,
    loginUser, 
    getUserInfo,
};