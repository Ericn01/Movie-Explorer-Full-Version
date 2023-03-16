const express = require('express');
const router = express.Router();
const {registerUser, use} = require('../controllers/userController');
router.post('/', registerUser);
router.post('/', registerUser);
router.post('/', registerUser);

module.exports = router;