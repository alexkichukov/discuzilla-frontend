import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Button,
  Dropdown,
  Image,
  Link,
  Navbar,
  Text,
  Avatar,
  Row,
  Divider
} from '@nextui-org/react'
import { deauthenticate } from '@/store/auth'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from '@/hooks'
import DiscuzillaLogo from '@/assets/discuzilla.png'

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.auth.user!)

  const logout = () => {
    navigate('/')
    dispatch(deauthenticate())
    toast(`You've been logged out`)
  }

  const links = [{ to: '/', name: 'Home' }]

  return (
    <Navbar variant='sticky' maxWidth='sm'>
      <Navbar.Toggle showIn='xs' />

      <Navbar.Brand>
        <NavLink to='/'>
          <Image width={120} src={DiscuzillaLogo} />
        </NavLink>
      </Navbar.Brand>

      <Navbar.Content hideIn='xs'>
        <Navbar.Link to='/' isActive={location.pathname === '/'} as={NavLink}>
          Home
        </Navbar.Link>

        <Dropdown placement='bottom-right'>
          <Navbar.Item>
            <Dropdown.Button light>
              <Text b>Account</Text>
            </Dropdown.Button>
          </Navbar.Item>
          <Dropdown.Menu
            onAction={(k) => {
              const key = k.toString()
              if (key === 'logout') logout()
              else navigate(key)
            }}
            disabledKeys={['hi']}
          >
            <Dropdown.Item key='hi' variant='light' textValue='hi'>
              <Row>
                <Text css={{ mr: '$2' }}>Hi</Text>
                <Text b>{user.username}</Text>
              </Row>
            </Dropdown.Item>
            <Dropdown.Item key='/user/posts' withDivider textValue='profile'>
              <Text b>Posts</Text>
            </Dropdown.Item>
            <Dropdown.Item key='/user/comments' textValue='comments'>
              <Text b>Comments</Text>
            </Dropdown.Item>
            <Dropdown.Item key='logout' color='error' withDivider textValue='logout'>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>

      <Navbar.Collapse>
        <Navbar.CollapseItem>
          <Link color='inherit' to='/' as={NavLink}>
            Home
          </Link>
        </Navbar.CollapseItem>
        <Divider />
        <Navbar.CollapseItem>
          <Row css={{ pt: '$10' }}>
            <Text size='$lg' css={{ mr: '$2' }}>
              Hi
            </Text>
            <Text size='$lg' b>
              {user.username}
            </Text>
          </Row>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          <Link color='inherit' to='/' as={NavLink}>
            Posts
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          <Link color='inherit' to='/' as={NavLink}>
            Comments
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          <Link color='error'>Logout</Link>
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
