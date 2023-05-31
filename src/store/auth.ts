import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

interface AuthState {
  user: AuthUser | null
}

const initialState: AuthState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set JWT token and decode it
    authenticate(state, action: PayloadAction<string>) {
      const user: User = jwtDecode(action.payload)
      state.user = {
        ...user,
        token: action.payload
      }
    },
    deauthenticate(state) {
      state.user = null
    }
  }
})

export const { authenticate, deauthenticate } = authSlice.actions

export default authSlice.reducer
