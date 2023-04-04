const User = require('../models/userModel');
const passport = require('passport');
// Controller logic for the user login view.
    
// @desc retrieves all the users
// @route GET /api/users/
// @access Private
const getAllUsers = async (req, res) => {
    const users = await User.find({}).sort({id: 1});
    res.status(200).json(users);
};

// Login the user if the passwords are correct
// If the user does not already exist in the database, they will be created.
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    let loginErrors = [];
    // Check to see that the email and password fields are full
    if (!email || !password){loginErrors.push({message: "Please ensure sure that all fields have values."})};
    // Make sure the password is at least 5 characters long
    if (password.length < 5){loginErrors.push({message: "Please enter a password that is at least 5 characters long."})};
    // Check the state errors array and display the errors
    if (loginErrors.length > 0){
        res.render('login', { loginErrors }); // Display the login errors
    } else{
        passport.authenticate('localLogin', {
            successRedirect: '/users/index',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    }
}
module.exports = {
    loginUser,
    getAllUsers
}