const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    author: {
        type: String,
        required: [true, "Author is required, if there is no author please write 'Unkown'"]
    },
    available_copy: {
        type: Number,
        default: 1
    }
});

const Book = mongoose.model("book", bookSchema);

module.exports = Book;