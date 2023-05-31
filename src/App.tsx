import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import { useSelector } from '@/hooks'
import Home from '@/pages/Home'
import Auth from '@/pages/Auth'
import Navigation from '@/components/Navigation'
import 'react-toastify/dist/ReactToastify.css'

// App theme
const darkTheme = createTheme({ type: 'dark' })

const App = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <NextUIProvider theme={darkTheme}>
      <BrowserRouter>
        {user && <Navigation />}
        <Routes>
          {user ? (
            <>
              <Route path='/' element={<Home />} />
            </>
          ) : (
            <Route path='*' element={<Auth />} />
          )}
        </Routes>

        {/* Global level toast */}
        <ToastContainer
          position='bottom-right'
          theme='dark'
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </BrowserRouter>
    </NextUIProvider>
  )
}

export default App
