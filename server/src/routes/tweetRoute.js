const tweetController = require('../controllers/tweetController')
const likeController = require('../controllers/likeController')

module.exports = app => {

  app.get('/tweets', tweetController.index)
  app.post('/tweets/create', tweetController.store)
  app.put('/tweets/update/:_id', tweetController.update)
  app.delete('/tweets/delete/:_id', tweetController.destroy)
  app.post('/tweets/likes/:_id', likeController.store)
}