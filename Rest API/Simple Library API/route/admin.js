require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const Token = require('../model/token');
const User = require('../model/user');
const Book = require('../model/book');

const route = express.Router();

route.get("/token", validate, checkAdmin, (req, res, next) => {
    Token.find().populate("user").then((result) => {
        res.status(200).send(result);
    });
});

route.get('/user', validate, checkAdmin, (req, res, next) => {
    User.find().where('role').equals('user').select("email username name").then((result) => {
       res.status(200).send(result); 
    }).catch((err) => {
        if(Object.keys(err).length){
            console.log(err);
            res.status(403).send({error_type: "mongodb_find_failed", message: err.errmsg});
        }
        else{
            res.status(403).send({error_type: "mongodb_find_failed", message: "Something happened, failed to get user!"});
        }
    });
});

route.get('/book', validate, checkAdmin, (req, res, next) => {
    Book.find().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        if(Object.keys(err).length){
            console.log(err);
            res.status(403).send({error_type: "mongodb_find_failed", message: err.errmsg});
        }
        else{
            res.status(403).send({error_type: "mongodb_find_failed", message: "Something happened, failed to get book!"});
        }
    });
});

route.post('/book', validate, checkAdmin, (req, res, next) => {
    Book.create({name: req.body.name, author: req.body.author, available_copy: req.body.available_copy}).then((book) => {
        res.status(200).send(book);
    }).catch((err) => {
        if(Object.keys(err).length){
            console.log(err);
            res.status(403).send({error_type: "mongodb_create_failed", message: err.errmsg});
        }
        else{
            res.status(403).send({error_type: "mongodb_create_failed", message: "Something happened, failed to add book!"});
        }
    });
});

function validate(req, res, next){
    Token.find({token: req.body.token}).then((result) => {
        if(result.length > 0){
            next();
        }
        else{
            res.status(403).send({error_type: "token_invalid", message: "Invalid token"});
        }
    }).catch((err) => {
        if(Object.keys(err).length){
            console.log(err);
            res.status(403).send({error_type: "mongodb_find_failed", message: err.errmsg});
        }
        else{
            res.status(403).send({error_type: "mongodb_find_failed", message: "Something happened, failed to find token!"});
        }
    });
}

function checkAdmin(req, res, next){
    const decoded = jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET);
    if(decoded){
        if(decoded.role == 'admin'){
            next();
        }
        else{
            res.send({error_type: "access_invalid", message: "You don't have access to this endpoint!"});
        }
    }
    else{
        res.status(403).send({type: "token_invalid", message: "Token invalid"});
    }
}

module.exports = route;