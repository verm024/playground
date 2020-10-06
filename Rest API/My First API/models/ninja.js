const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ninjaSchema = new Schema({
    name: {
        first: String,
        last: String,
    },
    rank: {
        type: String
    },
    available: {    
        type: Boolean,
        default: true
    }
});

let Ninja = mongoose.model("ninja", ninjaSchema);

module.exports = Ninja;