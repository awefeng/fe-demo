import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer
})

console.log('ok')
export type AppDispatch = typeof store.dispatch
export const dispatch = store.dispatch
export default store
