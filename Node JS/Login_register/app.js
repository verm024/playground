const express = require('express');
const mysql = require('mysql');	
const path = require('path');
const router = require('./routes/router')

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', router);


app.listen(3000, () => {
	console.log("listening to port 3000");
});