const express = require('express');
const router = express.Router();
const {loginUser, getAllUsers } = require('../controllers/usersController');
const { ensureAuthenticated } = require('../helper');

// Routes for the user login and registration views.
router.get('/index', ensureAuthenticated, (req, res) => {res.render('../views/index')});
router.get('/login', ensureAuthenticated, (req, res) => {res.render('../views/login')});
router.get('/', getAllUsers);
router.post('/login', loginUser);

module.exports = router;

