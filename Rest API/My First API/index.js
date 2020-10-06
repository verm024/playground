const express = require('express');
const bodyParser = require("body-parser");
const route = require("./route/route");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/ninjago", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use("/api", route);

app.listen(3000, () => {
    console.log("now listening for requests");
});