import React, { useState } from 'react'

import '../styles/login.css'
import logo from '../images/twitter.svg'

const Login = (props) => {

  const [user, setUser] = useState({ username: ''})

  const handleChangeUser = e => {
    setUser({ username: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { username } = user

    if(!username.length) return
    
    localStorage.setItem('@GoTwitter:username', username)

    props.history.push('/timeline')

  }

  return (
    <div className="login-wrapper">
      <img src={logo} alt="logo" />
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={ user.username }
          onChange={ handleChangeUser }
        />
        <button>Entrar</button>
      </form>
    </div>
  )
}

export default Login