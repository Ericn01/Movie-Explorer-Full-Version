// @desc Add a new user 
// @route POST /api/users/
// @access Public
const registerUser = (res, req) => {
    res.json({message: "Hello there"});
}

// @desc Get user data 
// @route POST /api/users/login
// @access Public
const loginUser = (res, req) => {
    res.json({message: "Hello there"});
}

// @desc Add user data
// @route GET /api/users/me
// @access Public
const getMe = (res, req) => {
    res.json({message: "user data display"});
}

module.exports = {
    registerUser,
    loginUser, 
    getMe,
};