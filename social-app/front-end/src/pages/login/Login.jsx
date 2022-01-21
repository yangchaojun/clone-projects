import React, {useContext, useRef } from 'react';
import './login.css'
import {AuthContext} from '../../context/AuthContext'
import { loginCall } from '../../apiCall'
import { CircularProgress } from '@material-ui/core'

export default function Login() {
  const email = useRef()
  const password = useRef()
  const {isFetching, dispatch} = useContext(AuthContext)

  const handleClick = (e) => {
    e.preventDefault()
    loginCall({
      email: email.current.value,
      password: password.current.value,
    }, dispatch )
  }

  return (<div className="login">
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className="loginLogo"> Lamasocial </h3>
        <span className="loginDesc">
          Connect with friends and the world around you on Lamasocial.
        </span>
      </div>
      <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
          <input type="email" required ref={email} placeholder='Email' className="loginInput" />
          <input type="password" required minLength={6} ref={password} placeholder='Password' className="loginInput" />
          <button type="submit" disabled={isFetching} className="loginButton">
            {
              isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : ("Log In")
            }
          </button>
          <span className="loginForgot">Forget Password</span>
          <button disabled={isFetching} className="loginRegisterButton">
            {
              isFetching ? (
                <CircularProgress color="primary" size="20px" />
              ) : ("Create a New Account ")
            }
          </button>
        </form>
      </div>
    </div>
  </div>);
}
