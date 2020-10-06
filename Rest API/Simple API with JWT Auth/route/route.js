require('dotenv').config();

const express = require('express');
const route = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

route.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, result) => {
        if(err) throw err;
        req.body.password = result;
        User.create(req.body).then((user) => {
            let token = jwt.sign({user: user.email}, process.env.JWT_SECRET, {expiresIn: '24h'});
            let returnedUser = {
                _id: user._id,
                email: user.email,
                token: token,
                method: "REGISTER"
            }
            res.status(200).send(returnedUser);
        }).catch((err) => {
            res.status(403).send(err);
        });
    });
});

route.post("/login", (req, res, next) => {
    User.findOne({email: req.body.email}).then((user) => {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err) throw err;
            if(result){
                let token= jwt.sign({user: user.email}, process.env.JWT_SECRET, {expiresIn: '24h'});
                let returnedUser = {
                    _id: user._id,
                    email: user.email,
                    token: token,
                    method: "LOGIN"
                }
                res.status(200).send(returnedUser);
            }
            else{
                res.status(403).send({message: "Wrong Password!"});
            }
        });
    }).catch((err) => {
        if(err){
            res.status(403).send(err);
        }
    });
});

route.get("/", authenticate, (req, res, next) => {
    res.status(200).send(req.body);
});

function authenticate(req, res, next) {
    let token = req.body.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            res.status(403).send(err);
        }
        if(decoded){
            next();
        }
    });
}

module.exports = route;