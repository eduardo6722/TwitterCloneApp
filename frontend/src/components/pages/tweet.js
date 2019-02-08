import React from 'react'

import '../styles/tweet.css'
import like from '../images/like.svg'
import api from '../../services/api'

const Tweet = (props) => {

  const { tweet } = props 

  const handleLike = async () => {
    await api.post(`/likes/${tweet._id}`)
      .catch(err => console.log(err))
      
  }

  return ( 
    <div className="tweet">
      <strong>{ tweet.author }</strong>
      <p>{ tweet.content }</p>
      <button type="button" onClick={ handleLike }>
        <img src={ like } alt="like" />
        { tweet.likes }
      </button>
    </div> 
  ) 
}

export default Tweet

