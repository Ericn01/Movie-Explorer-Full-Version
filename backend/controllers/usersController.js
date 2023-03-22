const bcrypt = require('bcrypt');
// View / Controller logic for the user login and registration views.

// Main page request
const indexView = (req, res) => {
    res.status(200).render('../views/index.ejs');
} 

// Login view / page
const loginView = (req,res) => {
    res.render('../views/login.ejs')
}

// Login the user
const loginUser = async (req, res) => {
    emptyBodyCheck(req.body.text, res)
    const { email, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password);
        res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
}

// Checks to see if the body of 
const emptyBodyCheck = (text, res) => {
    if (!text) {
        res.status(500);
        throw new Error("Please fill out the required fields.");
    }
}


module.exports = {
    indexView,
    loginView,
    loginUser,
}