import { PersistGate } from 'redux-persist/integration/react'
import { createRoot } from 'react-dom/client'
import { persistor, store } from '@/store'
import { Provider } from 'react-redux'
import React from 'react'
import App from './App'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
