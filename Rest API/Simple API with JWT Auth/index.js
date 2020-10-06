const express = require('express');
const bodyParser = require('body-parser');
const router = require('./route/route');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost/simpleauth", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use("/api", router);

app.listen(3000, () => {
    console.log("Listening to port 3000...");
});