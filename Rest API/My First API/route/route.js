const express = require('express');
const route = express.Router();
const Ninja = require("../models/ninja");

route.get("/ninjas", (req, res, next) => {
    Ninja.find().select("name rank").then((ninja) => {
        res.send(ninja);
    });
});

route.post("/ninjas", (req, res, next) => {
    Ninja.create(req.body).then((ninja) => {
        res.send(ninja);
    });
});

route.put("/ninjas/:id", (req, res, next) => {
    Ninja.findByIdAndUpdate(req.params.id, req.body).then((ninja) => {
        Ninja.findById(req.params.id).then((ninja) => {
            res.send(ninja);
        });
    });
});

route.delete("/ninjas/:id", (req, res, next) => {
    res.send({type: "DELETE"});
});

module.exports = route;