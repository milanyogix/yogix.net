const express = require("express");
const app = express();
const routes = express.Router();
const bcrypt = require("bcrypt");
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const crypto = require('crypto');
const User = require('../app/model/signup');
const Sub = require('../app/model/subscribe');
const resetToken = require('../app/model/resettoken');
const mailer = require('../app/http/middlewares/sendMail');
routes.use(session({
    secret: "yogixweb",
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true
}));

routes.use(passport.initialize());
routes.use(passport.session());

routes.use(flash());
// middleware
routes.use(function(req, res, next) {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

const checkAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cacha,private,no-store, must-revalidate,post-check=0,pre-check=0')
        return next();
    } else {
        res.render("index", { logged: false });
    }
    //else {
    //     res.redirect('/login');
    // }
};
// authenticationj Strategy
passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email }, (err, data) => {
        if (err) throw err;
        if (!data) {
            return done(null, false, { message: "User Doesn't Exist..." });
        }
        bcrypt.compare(password, data.password, (err, match) => {
            if (err) return done(null, false);
            if (!match) return done(null, false, { message: "Wronge Password..." });
            if (match) return done(null, data);
        });

    });
}));

passport.serializeUser(function(User, cb) {
    cb(null, User.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, User) {
        done(err, User);
    })
});