const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TweetSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    max: 250,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = Tweet = mongoose.model('tweets', TweetSchema)