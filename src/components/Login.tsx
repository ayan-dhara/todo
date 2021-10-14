import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../redux/hooks/appHooks";
import useLogin from "../hooks/useLogin";
import {setLogin} from '../redux/login'

import '../styles/login.scss'

// @ts-ignore
const Login = () => {
  const [login, {signIn, signUp}] = useLogin()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [create, setCreate] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setLogin(login))
  }, [dispatch, login])

  const submitForm = (event: any) => {
    try {
      if (create) {
        signUp(name, email, password, confirm)
      } else {
        signIn(email, password)
      }
    } catch (e) {
      console.error(e)
    }
    event.preventDefault()
  }

  return (
    <div className="login-popup">
      <div className="main">
        <div className="title">{create ? "Create Account" : "Login"}</div>
        <form onSubmit={submitForm}>
          {
            create ?
              <div>
                <span>Full Name</span>
                <input type="text" placeholder="Full Name" required={true}
                       onChange={(e) => setName(e.target.value)} value={name}/>
              </div> : null
          }
          <div>
            <span>Email Address</span>
            <input type="email" placeholder="Email" required={true}
                   onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>
          <div>
            <span>Password</span>
            <input type="password" placeholder="password" required={true}
                   onChange={(e) => setPassword(e.target.value)} value={password}/>
          </div>
          {
            create ?
              <div>
                <span>Confirm Password</span>
                <input type="password" placeholder="confirm" required={true}
                       onChange={(e) => setConfirm(e.target.value)} value={confirm}/>
              </div> : null
          }
          {
            login.success || login.initial ?
              <br/> :
              <div className="error">
                {login.message}
              </div>
          }
          <button>
            {create ? "Create" : "Login"}
          </button>
        </form>
        <span>------ OR ------</span>
        <br/>
        <div>
          <button onClick={() => setCreate(!create)}>
            {create ? "Login" : "Create Account"}
          </button>
        </div>
        <br/>
      </div>
    </div>
  );
};

export default Login;
