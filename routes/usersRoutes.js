const express = require('express'),
    router = express.Router(),
    User = require("../models/userModel"),
    passport = require("passport"),
    localStrategy = require("passport-local")
    
router.get("/login", (req, res) => {
    res.render("admin/login")
});
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/admin",
        failureRedirect: "/login"

    }), (req, res) => {

    });
router.get("/signup", (req, res) => {
    res.render("admin/signup")
});
router.post("/signup", (req, res) => {
    console.log(req.body)
    const newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/signup")
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/admin");
        })
    })
});
router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/")
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}










module.exports = router;