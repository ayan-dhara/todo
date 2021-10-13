import { configureStore } from '@reduxjs/toolkit'
import login from './login'

const store = configureStore({
  reducer: {
    login
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
