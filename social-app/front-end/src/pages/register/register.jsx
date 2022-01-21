import "./register.css";
import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


export default function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const history = useHistory()

  const handleClick = async (e) => {
    e.preventDefault()
    if(passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }

      try {
        await axios.post('/api/auth/register', user)
        history.push('/login')
      } catch(err) {
        console.log(err);
      }
    }
  }


  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input required ref={username} placeholder="Username" className="loginInput" />
            <input required ref={email} placeholder="Email" className="loginInput" />
            <input required ref={password} type="password" minLength={6} placeholder="Password" className="loginInput" />
            <input required ref={passwordAgain} type="password" placeholder="Password Again" className="loginInput" />
            <button type="submit" className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
