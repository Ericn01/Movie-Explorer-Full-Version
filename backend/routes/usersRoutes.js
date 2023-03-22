const express = require('express');
const router = express.Router();
const { indexView, loginView, loginUser } = require('../controllers/usersController');

// Routes for the user login and registration views.
router.get('/', indexView);
router.get('/login', loginView);
router.post('/login', loginUser);

module.exports = router;

