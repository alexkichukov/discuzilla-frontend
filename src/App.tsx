import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import { useSelector } from '@/hooks'
import HomePage from '@/pages/HomePage'
import AuthPage from '@/pages/AuthPage'
import PostPage from '@/pages/PostPage'
import TestPage from '@/pages/TestPage'
import NewPostPage from '@/pages/NewPostPage'
import Navigation from '@/components/Navigation'
import PageLayout from '@/components/PageLayout'
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
          <Route element={<PageLayout />}>
            {user ? (
              <>
                <Route path='/' element={<HomePage />} />
                <Route path='/post/:id' element={<PostPage />} />
                <Route path='/new-post' element={<NewPostPage />} />
                <Route path='/test' element={<TestPage />} />
              </>
            ) : (
              <>
                <Route path='/auth' element={<AuthPage />} />
                <Route path='*' element={<Navigate replace to='/auth' />} />
              </>
            )}
          </Route>
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
