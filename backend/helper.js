const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        console.log("authenticated");
        return next();
    }
    console.log("authentication failed");
    req.flash('info', 'Please log in to access that resource');
    res.render('login', {user: req.body});
}

module.exports = {ensureAuthenticated};