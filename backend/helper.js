const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        console.log("authenticated");
        return next();
    }
    req.flash('auth_error', 'Please log in to access that resource');
    res.render('login', {user: req.body, auth_error: req.flash('auth_error')});
}

module.exports = {ensureAuthenticated};