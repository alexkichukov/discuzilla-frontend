import { configureStore } from '@reduxjs/toolkit'
import { persistCombineReducers, persistStore } from 'redux-persist'
import { apiSlice } from './api'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [apiSlice.reducerPath]
}

const reducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
