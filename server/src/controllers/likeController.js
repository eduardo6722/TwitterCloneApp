const Tweet = require('../models/Tweet')

module.exports = {
  async store(req, res) {
    const tweet = await Tweet.findOne({ _id: req.params._id }).catch(err => console.log(err))
     
    await Tweet.findOneAndUpdate(
      { _id: tweet._id }, 
      { $set: { likes: tweet.likes + 1 } }, 
      { new: true }, (err, tweet) => {
        if(err)
          return res.status(400).send(err)
        
        req.io.emit('like', tweet)  

        return res.json(tweet)
    })
  }
}
