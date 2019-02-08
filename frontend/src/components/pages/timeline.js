import React, { useState, useEffect, Component } from 'react'
import socket from 'socket.io-client'

import '../styles/timeline.css'
import logo from '../images/twitter.svg'
import api from '../../services/api'
import Tweet from './tweet'

class Timeline extends Component {

  state = {
    tweets: [],
    content: '',
    author: ''
  }

  componentDidMount() {
    this.handleSockets()
    this.getTweets()
  }

  handleNewTweet =  async (e) => {
    if(e.keyCode !== 13) return

    const newTweet = {
      author: localStorage.getItem('@GoTwitter:username'),
      content: e.target.value
    }
    
    await api.post('create', newTweet)
      .catch(err => console.log)

    this.getTweets()
    this.setState({ content: '' })
  }

  handleInputChange = e => {
    this.setState({ content: e.target.value })
  }

  handleSockets = () => {
    const io = socket('http://localhost:3000')

    io.on('like', data => {
      this.setState({ tweets: this.state.tweets.map( tweet => tweet._id == data._id ? data : tweet )})
    })

    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets ]})
    })
  }

  getTweets = async () => {
    await api.get('')
      .then(res => this.setState({ tweets: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={30} src={logo} alt="logo" />
        <form>
          <textarea 
            value={ this.state.content }
            onChange={ this.handleInputChange }
            onKeyDown={ this.handleNewTweet }
            placeholder="O que está acontendendo"
          />
        </form>
        <div className="tweet-list">
          {
            this.state.tweets.map(tweet => (
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
}

export default Timeline
