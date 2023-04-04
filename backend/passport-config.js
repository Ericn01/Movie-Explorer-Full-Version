const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/userModel');
const bcrypt = require('bcrypt');
const { match } = require('assert');


// fields for the form.
const options = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};
// Strategy for the user validation
const loginStrategy = new LocalStrategy(options, async (req, email, password, done) => {
    try{
        // Find the matching user in the DB
        const matchingUser = await User.findOne({email: email});
        if (!matchingUser){ // No matching user 
            req.flash('auth_error', 'The specified email could not be found.')
            return done(null, false, {message: "The specified email was not found"});
        }
        // Check the passwords 
        const hash = matchingUser.password_bcrypt;
        const validate = await bcrypt.compare(password, hash);
        if (!validate){ // wrong password
            req.flash('auth_error', 'The specified password is incorrect.')
            return done(null, false, {message: "Incorrect password."});
        }
        return done(null, matchingUser, {message: "Login successful"});
    }
    catch (err){
        console.log(err);
        return done(err);
    }
});
// Passport setup 
passport.use('localLogin', loginStrategy)
passport.serializeUser( (user, done) => done(null, user.email) );
passport.deserializeUser(async (email, done) => {
    try {
        const user = await User.findOne({ email }).exec();
        done(null, user);
    } catch (err) {
        done(err);
    }
});
