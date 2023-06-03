import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    authenticate(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
    },
    deauthenticate(state) {
      state.user = null
    }
  }
})

export const { authenticate, deauthenticate } = authSlice.actions

export default authSlice.reducer
