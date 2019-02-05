const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000
const db = require('./database/dbConnection').mongoURI

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
  req.io = io
  return next()
})

mongoose.connect(db, { useNewUrlParser: true })
  .then(console.log('MongoDB connected'))
  .catch(err => console.log(err))

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app