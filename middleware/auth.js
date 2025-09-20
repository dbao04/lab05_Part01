// middleware/auth.js
module.exports = {
    ensureAuth: (req, res, next) => {
        if (req.session && req.session.user) {
            return next();
        }
        res.redirect('/auth/login');
    }
};