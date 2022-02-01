require('dotenv').config();
const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    nodemon = require("nodemon"),
    PORT = process.env.PORT || 3001,
    methodOverride = require("method-override"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    expressSession = require("express-session"),
    fileUpload = require("express-fileupload"),
    User = require("./models/userModel");
 
const adminRoutes = require("./routes/adminRoutes");
const indexRoutes = require("./routes/indexRoutes");
const usersRoutes = require("./routes/usersRoutes");

const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@duhandb.pylk5.mongodb.net/emlak_sitesi?retryWrites=true&w=majority`;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true })
    .then((result) => {
        console.log("Bağlantı Kuruldu");
    }).catch((err) => {
        console.log("hata");
        console.log(err);
    });

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.use(require("express-session")({
    secret: "güvenlik cümlesi",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.use(indexRoutes);
app.use(adminRoutes);
app.use(usersRoutes);

app.listen(PORT, () => console.log("Example app listening on port port!"));







