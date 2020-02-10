const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: String,
  body: String,
  keyword: [String],
  media: [String],
  upvotes: {
    type: Number,
     default: 0
  },
  author: String,
  // author: { 
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, { timestamps: true });

ArticleSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    keyword: this.keyword,
    author: this.author,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Article', ArticleSchema);