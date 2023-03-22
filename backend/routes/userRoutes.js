const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUserInfo} = require('../controllers/userController');
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/user', getUserInfo);

module.exports = router;