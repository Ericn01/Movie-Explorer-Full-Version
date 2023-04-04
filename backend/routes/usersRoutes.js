const express = require('express');
const router = express.Router();
const {loginUser, getAllUsers } = require('../controllers/usersController');
const { ensureAuthenticated } = require('../helper');

// Routes for the user login and registration views.
router.get('/index', ensureAuthenticated, (req, res) => {res.render('../views/index.ejs')});
router.get('/login', (req, res) => {res.render('../views/login.ejs')});
// Returns all the users in the DB (for testing)
router.get('/', getAllUsers);
// Posts form data and logs in the user (or registers if the account doesn't exist) 
router.post('/login', loginUser);
// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err){ console.log(err) }
            req.flash('auth_success', 'User was logged out succesfully.');
            res.redirect('login');
    });
    
});
router.get('/movie-explorer', ensureAuthenticated, (req, res) => {
    res.redirect('http://localhost:5173');
});


module.exports = router;

