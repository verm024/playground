require('dotenv').config();

const express = require('express');
const validator = require('validator');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
const User = require('../model/user');
const Token = require('../model/token');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send({type: "GET", auth: true});
});

router.post("/register", (req, res, next) => {
    let isLengthPassword = validator.isLength(req.body.password, {min: 8, max: 20});
    let isLengthUsername = validator.isLength(req.body.username, {min: 6, max: 20});
    let isEmail = validator.isEmail(req.body.email);
    
    if(!isLengthPassword || !req.body.password){
        return res.status(403).send({error_type: "password_create_length", message: "Password must be more than 8 characters and less than 20!"});
    }
    if(!isLengthUsername || !req.body.username){
        return res.status(403).send({error_type: "username_create_length", message: "Username must be more than 6 characters and less than 20!"});
    }
    if(!isEmail || !req.body.email){
        return res.status(403).send({error_type: "email_create_not_valid", message: "Please enter a valid email address!"});
    }

    bcrypt.hash(req.body.password, 10, (err, result) => {
        let user = {
            email: req.body.email,
            username: req.body.username,
            password: result,
            name: req.body.name,
            role: (req.body.role) ? req.body.role : 'user'
        }
        User.create(user).then((result) => {
            payload = {
                username: result.username,
                role: result.role
            };
            let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
            Token.create({token: token, user: user[0]._id}).then((token) => {
                payload.token = token.token;
                res.status(200).send(payload);
            }).catch((err) => {
                if(Object.keys(err).length){
                    res.status(403).send({error_type: "mongodb_create_failed", message: err.errmsg});
                }
                else{
                    res.status(403).send({error_type: "mongodb_create_failed", message: "Something happened, failed to login!"});
                }
            });
        }).catch((err) => {
            if(Object.keys(err).length){
                res.status(403).send({error_type: "mongodb_create_failed", message: err.errmsg});
            }
            else{
                res.status(403).send({error_type: "mongodb_create_failed", message: "Something happened, failed to create user!"});
            }
        });
    });
});

router.post("/login", (req, res, next) => {
    User.find({username: req.body.username}).then((user) => {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) {
                return res.status(403).send({error_type: "mongodb_find_failed", message: "Something happened, failed to login!"});
            }
            if(result){
                payload = {
                    username: req.body.username,
                    role: user[0].role
                }
                let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
                Token.create({token: token, user: user[0]._id}).then((token) => {
                    payload.token = token.token;
                    res.status(200).send(payload);
                }).catch((err) => {
                    if(Object.keys(err).length){
                        console.log(err);
                        res.status(403).send({error_type: "mongodb_create_failed", message: err.errmsg});
                    }
                    else{
                        res.status(403).send({error_type: "mongodb_create_failed", message: "Something happened, failed to login!"});
                    }
                });
            }   
            else{
                res.status(403).send({error_type: "password_find_wrong", message: "Password wrong!"});
            }
        });
    }).catch((err) => {
        if(Object.keys(err).length){
            res.status(403).send({error_type: "mongodb_find_failed", message: err.errmsg});
        }
        else{
            res.status(403).send({error_type: "mongodb_find_failed", message: "Something happened, failed to login!"});
        }
    });
});

router.delete("/logout", (req, res, next) => {
    Token.findOneAndDelete({token: req.body.token}).then((result) => {
        if(result){
            res.status(200).send(result);
        }
        else{
            res.status(403).send({error_type: "mongodb_find_failed", message: "Your token does not exist!"});
        }
    }).catch((err) => {
        if(Object.keys(err).length){
            res.status(403).send({error_type: "mongodb_delete_failed", message: err.errmsg});
        }
        else{
            res.status(403).send({error_type: "mongodb_delete_failed", message: "Something happened, failed to logout!"});
        }
    });
});

module.exports = router;