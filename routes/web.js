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
// end of authenticate 

routes.get("/", checkAuthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index", { 'User': req.user, logged: true });
    } else {
        res.render("index", { logged: false });
    }
});

routes.get("/login", (req, res) => {
    res.render('../views/auth/login');
    // res.render("yoga", { 'User': req.user, logged: true });
});
routes.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy(function(err) {
        res.redirect('/login');
    });
});
routes.get("/signup", (req, res) => {
    res.render('../views/auth/signup');
    // res.render("yoga", { 'User': req.user, logged: true });
});

routes.post("/signup", (req, res) => {
    var { email, username, password, confirmpassword } = req.body;
    var err;
    if (!email || !username || !password || !confirmpassword) {
        err = "Please fill all the fields...."
        console.log(err);
        res.render('../views/auth/signup', { 'err': err });
    } else if (password != confirmpassword) {
        err = "Passwords are not matching...."
        console.log(err);
        res.render('../views/auth/signup', { 'err': err, 'email': email, 'username': username });
    } else if (typeof err == 'undefined') {
        User.findOne({ email: email }, function(err, data) {
            if (err) throw err;
            if (data) {
                console.log("user exist");
                err = "User exists with email..."
                res.render('../views/auth/signup', { 'err': err, 'email': email, 'username': username });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        User({
                            email,
                            username,
                            password
                        }).save((err, data) => {
                            if (err) throw err;
                            // req.flash('success_message', "Register Successfully");
                            res.redirect('/login');
                        })
                    })
                })
            }
        });
    }
});
routes.post("/login", (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: "/login",
        successRedirect: '/',
        failureFlash: true
    })(req, res, next);
});
routes.post("/subscribe", (req, res) => {
    var email = req.body.subemail;

    Sub({ email }).save();
    res.redirect("/");
});
routes.get('/forgot-password', (req, res) => {
    res.render('../views/auth/forgot-password');
});
routes.post('/forgot-password', async(req, res) => {
    const { email } = req.body;
    var userData = await User.findOne({ email: email });
    if (userData) {
        var token = crypto.randomBytes(32).toString('hex');
        await resetToken({ token: token, email: email }).save();
        mailer.sendResetEmail(email, token).then(result => console.log("Email send")).catch(error => console.log(error));
        res.render('../views/auth/forgot-password', { email: email, message: "Password Reset Link send to your Email..." });
    } else {
        res.render('../views/auth/forgot-password', { err: "User Not Exist...." });
    }
});
routes.get('/reset-password', async(req, res) => {
    const token = req.query.token;
    if (token) {
        var check = await resetToken.findOne({ token: token });
        console.log(check.email);
        res.render('../views/auth/forgot-password', { reset: true, email: check.email });
    } else {
        res.redirect('/login');
    }
});
routes.post('/reset-password', async(req, res) => {
    const { password, password2, email } = req.body;
    if (!password || !password2 || (password != password2)) {
        res.render('../views/auth/forgot-password', { reset: true, email: email });
    } else {
        var salt = await bcrypt.genSalt(12);
        if (salt) {
            var hash = await bcrypt.hash(password, salt);
            var doc = await User.findOne({ email: email });
            await User.findOneAndUpdate({ email: email }, { $set: { password: hash } });
            res.render('../views/auth/login');
        } else {
            res.render('../views/auth/forgot-password', { reset: true, email: check.email });
        }
    }
});


routes.get("/ashtanga", (req, res) => {
    if (req.isAuthenticated()) {
        res.render('../views/yogas/ashtanga', { 'User': req.user, logged: true, url: "https://www.youtube.com/embed/cPchbcjRk8U", yoga: "ashtanga" });
        // res.render("yoga", { 'User': req.user, logged: true });
    } else {
        res.redirect('/login');
    }
});
routes.get("/ashtangainfo", (req, res) => {
    if (req.isAuthenticated()) {
        res.render('../views/yogas/ashtangainfo', { 'User': req.user, logged: true, yoga: "ashtanga" });
    } else {
        res.redirect('/login');
    }
});
routes.get("/hathainfo", (req, res) => {
    if (req.isAuthenticated()) {
        res.render('../views/yogas/hathainfo', { 'User': req.user, logged: true, yoga: "hatha" });
    } else {
        res.redirect('/login');
    }
});
routes.get("/hatha", (req, res) => {
    if (req.isAuthenticated()) {
        res.render('../views/yogas/hatha', { 'User': req.user, logged: true, url: "https://www.youtube.com/embed/Sk6xLk8QL0I", yoga: "hatha" });
        // res.render("yoga", { 'User': req.user, logged: true });
    } else {
        res.redirect('/login');
    }
});
routes.get("/bikram", (req, res) => {
    if (req.isAuthenticated()) {
        res.render('../views/yogas/bikram', { 'User': req.user, logged: true, url: "https://www.youtube.com/embed/Sk6xLk8QL0I", yoga: "bikram" });
        // res.render("yoga", { 'User': req.user, logged: true });
    } else {
        res.redirect('/login');
    }
});
routes.get("/bikraminfo", (req, res) => {
    if (req.isAuthenticated()) {
        res.render('../views/yogas/bikraminfo', { 'User': req.user, logged: true, yoga: "bikram" });
    } else {
        res.redirect('/login');
    }
});
routes.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("dashboard", { 'User': req.user, logged: true });
    } else {
        res.render("index", { logged: false });
    }
});
module.exports = routes;