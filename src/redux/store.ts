import { configureStore } from '@reduxjs/toolkit'
import login from './login'
import todo from './todo'

const store = configureStore({
  reducer: {
    login,
    todo
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
