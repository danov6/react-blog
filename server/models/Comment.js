const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
    article: String,
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: {
        type: Number,
         default: 0
    },
    body: String,
}, { timestamps: true });

mongoose.model('Comment', CommentSchema);