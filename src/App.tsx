import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import { useSelector } from '@/hooks'
import UserPage, { UserPostsPage, UserCommentsPage } from '@/pages/UserPage'
import LeaderboardPage from '@/pages/LeaderboardPage'
import Navigation from '@/components/Navigation'
import SettingsPage from '@/pages/SettingsPage'
import NewPostPage from '@/pages/NewPostPage'
import HomePage from '@/pages/HomePage'
import AuthPage from '@/pages/AuthPage'
import PostPage from '@/pages/PostPage'
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
              <Route index path='/' element={<HomePage />} />
              <Route path='/post/:id' element={<PostPage />} />
              <Route path='/leaderboard' element={<LeaderboardPage />} />
              <Route path='/new-post' element={<NewPostPage />} />
              <Route path='/settings' element={<SettingsPage />} />
              <Route path='/user/:id/' element={<UserPage />}>
                <Route index element={<Navigate replace to='posts' />} />
                <Route path='posts' element={<UserPostsPage />} />
                <Route path='comments' element={<UserCommentsPage />} />
                <Route path='*' element={<Navigate replace to='posts' />} />
              </Route>
            </>
          ) : (
            <>
              <Route path='/auth' element={<AuthPage />} />
              <Route path='*' element={<Navigate replace to='/auth' />} />
            </>
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
