const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content: String,
    username: String,
    BlogId: mongoose.Schema.Types.ObjectId
})

const Comments = mongoose.model("comments", commentSchema);

module.exports = Comments;