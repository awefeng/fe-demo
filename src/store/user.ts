import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface UserStateProps {
  userId: string
  name: string
  phone: string
}

const initState = (): UserStateProps => {
  return {
    userId: '',
    name: '',
    phone: ''
  }
}
const userSlice = createSlice({
  name: 'user',
  initialState: initState(),
  reducers: {
    init(state) {
      const initS = initState()

      Object.keys(initS).forEach((key) => {
        state[key] = initS[key]
      })
    },
    setUserInfo(state, action: PayloadAction<Partial<UserStateProps>>) {
      const inputState = action.payload

      Object.keys(inputState).forEach((key) => {
        state[key] = inputState[key]
      })
    }
  }
})

export const { init, setUserInfo } = userSlice.actions

export default userSlice.reducer
