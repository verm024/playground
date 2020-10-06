const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const authRouter = require("./route/auth");
const router = require("./route/route");
const authAdmin = require('./route/admin');

const app = express();

mongoose.connect('mongodb://localhost/simplelibrary', {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/admin', authAdmin);
app.use("/api", router);

app.listen(3000, () => {
    console.log("Listening to port 3000");
});