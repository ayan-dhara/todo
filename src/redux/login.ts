import {createSlice} from '@reduxjs/toolkit'
import {LoginState, initialState as loginInitialState} from "../hooks/useLogin";

export interface LoginReducer {
  loginState: LoginState
  popup: boolean
}

const initialState: LoginReducer = {
  loginState: loginInitialState,
  popup: false
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state: LoginReducer, action: { payload: LoginState; }) => {
      return {
        ...state,
        loginState: action.payload
      }
    }
  },
})

export const {setLogin} = loginSlice.actions

export default loginSlice.reducer
