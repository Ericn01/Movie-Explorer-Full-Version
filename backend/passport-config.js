const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/userModel');

const requiredFormOptions = {
    usernameField: 'email',
    passwordField: 'password'
};

// Strategy for the user validation
const loginStrategy = new LocalStrategy(requiredFormOptions, async (email, password, done) => {
    try{
        // Find the matching user in the DB
        const matchingUser = User.findOne({email: email});
        if (!matchingUser){ // No matching user 
            return done(null, false, {message: "Email not found"});
        }
        // Check the passwords 
        const isCorrectPassword = await matchingUser.isValidPassword(password);
        if (!isCorrectPassword){
            return done(null, false, {message: "Incorrect password entered"});
        }
        return done(null, matchingUser, {message: "Login successful"});
    }
    catch (err){
        console.log(err);
        return done(err);
    }
});

passport.serializeUser( (user, done) => done(null, user.email) );
passport.deserializeUser( (email, done) => {
    UserModel.findOne({ email: email }, (err, user) => done(err, user));
});

module.exports = { loginStrategy };