const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('info', 'Please log in to access that resource');
    res.render('login', {message: req.flash('info')})
}

module.exports = {ensureAuthenticated};