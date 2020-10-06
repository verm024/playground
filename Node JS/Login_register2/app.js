const express = require('express');
const path = require('path');
const router = require('./router/router');
const session = require("express-session");

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
    secret: "tomcat yellow",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

app.use("/", router);

app.listen(3000, () => {
    console.log("Listening to port 3000...");
});

module.exports = app;