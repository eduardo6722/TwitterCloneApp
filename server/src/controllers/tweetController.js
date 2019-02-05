const Tweet = require('../models/Tweet')

module.exports = {
  async index(req, res) {
    await Tweet.find({}).sort('-createdAt')
      .then(tweets => res.json(tweets))
      .catch(err => console.log(err))
  },

  async store(req, res) {
    const tweetFields = {}

    if(req.body.author) tweetFields.author = req.body.author
    if(req.body.content) tweetFields.content = req.body.content

    const tweet = await new Tweet(tweetFields).save()
      .catch(err => console.log(err))
    
    req.io.emit('tweet', tweet)

    return res.json(tweet)
  },

  async update(req, res) {
    await Tweet.findOneAndUpdate(
      { _id: req.params._id }, 
      { $set: { content: req.body.content } },
      { new: true }, (err, tweet) => {
        if(err)
          return res.status(500).send(err)
        res.json(tweet)
      })
      
  },

  async destroy(req, res) {
    await Tweet.findOneAndDelete({ _id: req.params._id })
      .then(resp => res.json({ msg: 'Tweet removed' }))
      .catch(err => console.log(err))
  }
}