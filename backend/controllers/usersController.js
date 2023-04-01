const bcrypt = require('bcrypt');
const User = require('../models/userModel');

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
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let loginErrors = [];
    // Check to see that the email and password fields are full
    if (!email || !password){loginErrors.push({message: "Please ensure sure that all fields have values."})};
    // Make sure the password is at least 5 characters long
    if (password.length < 5){loginErrors.push({message: "Password should be at least 5 characters long"})};
    // Check the state errors array
    if (loginErrors.length > 0){
        res.render('/login', {
            loginErrors,
        });
    } else{
        console.log("Entered password: ", password);
        const userResponse = await User.findOne({email: email});
        const hashedPassword = await bcrypt.hash(password, 10); // Create the hashed password
        if (userResponse && userResponse.password === hashedPassword) { // The user is already present in the DB
            res.redirect('/index');
        } else{ // userResponse is null, so we create a new user
            
            const user = await User.create({email, hashedPassword});
            console.log("User has been created: " + user);
            await user.save();
        }
        
    }
}

module.exports = {
    loginUser,
    getAllUsers
}