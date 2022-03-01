import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { USER_ROLE_ENUM } from '@/constants/user'
export interface UserStateProps {
  userId: string
  name: string
  phone: string
  role: USER_ROLE_ENUM
}

const initState = (): UserStateProps => {
  return {
    userId: '',
    name: '',
    phone: '',
    role: USER_ROLE_ENUM.GUEST
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
