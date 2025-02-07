const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    paragraph: {
        type: String,
        required: true,
    },

    image: {
        type: String
    },

    imageType: {
        type: String
    },

    username: {
        type: String,
    },
});

const Blogs = mongoose.model("blogs", blogSchema);

module.exports = Blogs;


