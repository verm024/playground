const express = require('express');
const router = express.Router();
const User = require('../core/user');
const user = new User();

router.get("/", (req, res, next) => {
	res.render("index");
});

router.get("/home", (req, res, next) => {
	let data = {
		title: "YOOOO"
	}
	res.render("home", data);
});

router.post("/login", (req, res, next) => {
	if(req.body.username == "" || req.body.password == ""){
		res.send("username or password can't be empty");
	}
	else{
		user.login(req.body.username, req.body.password, function(result){
			if(result){
				res.send("logged in as: " + result.username);
			}
			else{
				res.send("incorrect pass");
			}
		});
	}
});

router.post("/register", (req, res, next) => {
	if(req.body.username == "" || req.body.password == "" || req.body.fullname == ""){
		res.send("username or password or fullname can't be empty");
	}
	else{
		let userInput = {
			username: req.body.username,
			fullname: req.body.fullname,
			password: req.body.password
		};
		user.create(userInput, function(lastId){
			if(lastId){
				res.send(req.body.username);
			}
			else{
				res.send("error");
			}
		})
	}
	
});

module.exports = router;