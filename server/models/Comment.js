const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
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

CommentSchema.methods.toJSON = function() {
    return {
      _id: this._id,
      article: this.article,
      author: this.author,
      upvotes: this.upvotes,
      body: this.body,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  };

mongoose.model('Comment', CommentSchema);