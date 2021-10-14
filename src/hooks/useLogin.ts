import {useEffect, useState} from 'react'

export interface LoginState {
  loggedIn: boolean,
  name: string,
  email: string,
  userId: string,
  message: string,
  success: boolean,
  initial: boolean
}

export const initialState: LoginState = {
  loggedIn: false,
  name: "",
  email: "",
  userId: "",
  message: "",
  success: true,
  initial: true
}

const useLogin: any = (initialLogin: LoginState = initialState) => {
  const [login, setLogin] = useState(initialLogin)
  useEffect(() => {
    try {
      fetch("/api/user/verify")
        .then(r => r.json())
        .then(json => {
          setLogin({
            ...json,
            loggedIn: json.success,
            initial: true
          })
        })
        .catch((e) => {
          console.log(e)
          signOut()
        })
    } catch (e) {
    }
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
        setLogin({
          ...json,
          loggedIn: json.success,
          initial: false
        })
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
        setLogin({
          ...json,
          loggedIn: json.success,
          initial: false
        })
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
