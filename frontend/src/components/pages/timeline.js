import React, { useState, useEffect } from 'react'
import socket from 'socket.io-client'

import '../styles/timeline.css'
import logo from '../images/twitter.svg'
import api from '../../services/api'
import Tweet from './tweet'

const Timeline = () => {

  const [tweet, setTweet] = useState({ content: '', author: '' })
  const [tweets, setTweets] = useState([])

  const handleNewTweet =  async (e) => {
    if(e.keyCode !== 13) return

    const newTweet = {
      author: localStorage.getItem('@GoTwitter:username'),
      content: e.target.value
    }
    
    await api.post('create', newTweet)
      .then(res => console.log(res.data))
      .catch(err => console.log)

    getTweets()
    setTweet({ content: '' })
  }

  const handleInputChange = e => {
    setTweet({ content: e.target.value })
  }

  // crashes after insert or like a post
  /*const handleSockets = () => {
    const io = socket('http://localhost:3000/')

    io.on('like', data => {
      setTweets({
        tweets: tweets.map(
          tweet => ( tweet._id === data._id ? data: tweet )
        )
      })
    })

    io.on('tweet', data => {
      setTweets({ tweets: [data, ...tweets ]})
    })
  }*/

  const getTweets = async () => {
    await api.get('')
      .then(res => setTweets(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    //handleSockets()
    getTweets()
  }, [])

  return (
    <div className="timeline-wrapper">
    <h1>{tweet.author}</h1>
      <img height={30} src={logo} alt="logo" />
      <form>
        <textarea 
          value={ tweet.content }
          onChange={ handleInputChange }
          onKeyDown={ handleNewTweet }
          placeholder="O que está acontendendo"
        />
      </form>
      <div className="tweet-list">
        {
          tweets.map(tweet => (
            <Tweet 
              tweet={ tweet } 
              key={ tweet._id }
            />
          ))
        }
      </div>
      <br />
    </div>
  )
}

export default Timeline
