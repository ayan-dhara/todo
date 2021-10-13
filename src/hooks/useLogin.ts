import {useEffect, useState} from 'react'

export interface LoginState {
  loggedIn: Boolean,
  name: String,
  email: String,
  userId: String,
}

export const initialState: LoginState = {
  loggedIn: false,
  name: "",
  email: "",
  userId: "",
}

const useLogin: any = (initialLogin: LoginState = initialState) => {
  const [login, setLogin] = useState(initialLogin)
  useEffect(() => {
    try {
      fetch("/api/user/verify")
        .then(r => r.json())
        .then(json => {
          if (json.success) {
            setLogin({
              ...json,
              loggedIn: true
            })
          }
          else
            signOut()
        })
        .catch((e) => {
          console.log(e)
          signOut()
        })
    } catch (e) {}
  }, [])

  const signIn = (email: string, password: string) => {
    fetch("/api/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(r => r.json())
      .then((json: any) => {
        if (json.success) {
          setLogin({
            ...json,
            loggedIn: true
          })
        }
        else
          signOut()
      })
      .catch((e) => {
        console.log(e)
        signOut()
      })
  }

  const signUp = (name: string, email: string, password: string, confirm: string) => {
    fetch("/api/user/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirm
      })
    }).then(r => r.json())
      .then(json => {
        if (json.success) {
          setLogin({
            ...json,
            loggedIn: true
          })
        }
        else
          signOut()
      })
      .catch((e) => {
        console.log(e)
        signOut()
      })
  }

  const signOut = () => {
    setLogin(initialState)
    // TODO: send sign-out signal to server
  }
  return [login, {signIn, signUp}]
}

export default useLogin;
