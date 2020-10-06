const express = require('express');
const router = express.Router();
const User = require('../core/user');
const user = new User();

router.get("/", (req, res, next) => {
    let user = req.session.user;

    if(user){
        res.redirect('/dashboard');
    }
    else{
        res.render('index');
    }
});

router.post("/login", (req, res, next) => {
    user.login(req.body.username, req.body.password, function(result){
        console.log(result);
        if(result){
            req.session.user = result;
            req.session.opp = 1;
            res.redirect('/dashboard');
        }
        else{
            //res.send(result);
           res.send("Invalid username or password");
        }
    });
});

router.post('/register', (req, res, next) => {
    if(req.body.username.length < 6 || req.body.password.length < 6){
        res.send("Invalid username or password length");
    }
    else{
        let input = {
            username: req.body.username,
            password: req.body.password,
            level: req.body.level
        }
        let temp = user;
        user.find(req.body.username, function(user){
            if(user){
                res.send("Username sudah pernah dipakai");
            }
            else{
                temp.create(input, function(result){
                    if(result){
                        temp.find(result, function(result){
                            req.session.user = result;
                            req.session.opp = 0;
                            res.redirect('/dashboard');
                        });
                    }
                    else{
                        res.send("Cannot create new user");
                    }
                });
            }
        });
    }
});

router.get("/dashboard", (req, res, next) => {
    let user = req.session.user;

    if(user){
        res.render('dashboard', {user: req.session.user, opp: req.session.opp});
    }
    else{
        res.redirect('/');
    }
});

router.post('/logout', (req, res, next) => {
    if(req.session.user){
        req.session.destroy(function(){
            res.redirect('/');
        })
    }
});

module.exports = router;