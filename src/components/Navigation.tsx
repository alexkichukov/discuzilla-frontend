import { Dropdown, Image, Link, Navbar, Text, Row, Divider, Button } from '@nextui-org/react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from '@/hooks'
import { deauthenticate } from '@/store/auth'
import { toast } from 'react-toastify'
import { MdCreate } from 'react-icons/md'
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

  const links = [
    { to: '/', name: 'Home' },
    { to: '/leaderboard', name: 'Leaderboard' }
  ]

  const collapseLinks = [
    { to: '/', name: 'Home' },
    { to: '/leaderboard', name: 'Leaderboard' },
    { to: '/new-post', name: 'New post' }
  ]

  return (
    <Navbar variant='sticky' maxWidth='sm'>
      <Navbar.Toggle showIn='xs' />

      <Navbar.Brand>
        <NavLink to='/'>
          <Image width={120} src={DiscuzillaLogo} />
        </NavLink>
      </Navbar.Brand>

      <Navbar.Content hideIn='xs'>
        {links.map((link) => (
          <Navbar.Link
            key={link.name}
            to={link.to}
            isActive={location.pathname === link.to}
            as={NavLink}
          >
            {link.name}
          </Navbar.Link>
        ))}

        <Dropdown placement='bottom-right'>
          <Dropdown.Trigger>
            <Navbar.Link isActive={['/user/posts', '/user/comments'].includes(location.pathname)}>
              Account
            </Navbar.Link>
          </Dropdown.Trigger>
          <Dropdown.Menu
            onAction={(k) => {
              const key = k.toString()
              if (key === 'logout') logout()
              else navigate(key)
            }}
            disabledKeys={['hi']}
          >
            <Dropdown.Item
              key='hi'
              variant='light'
              textValue='hi'
              css={{ height: 'auto', py: '$5' }}
            >
              <Row>
                <Text css={{ mr: '$2' }}>Hi</Text>
                <Text b>{user.username}</Text>
              </Row>
              <Row>
                <Text>You have</Text>
                <Text b css={{ mx: '$2' }}>
                  {user.points}
                </Text>
                <Text>points!</Text>
              </Row>
            </Dropdown.Item>
            <Dropdown.Item key={`/user/${user.id}/posts`} withDivider textValue='profile'>
              <Text b>Posts</Text>
            </Dropdown.Item>
            <Dropdown.Item key={`/user/${user.id}/comments`} textValue='comments'>
              <Text b>Comments</Text>
            </Dropdown.Item>
            <Dropdown.Item key='logout' color='error' withDivider textValue='logout'>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Navbar.Link>
          <Button
            size='sm'
            bordered
            auto
            icon={<MdCreate />}
            onClick={() => navigate('/new-post')}
            color='gradient'
          >
            New Post
          </Button>
        </Navbar.Link>
      </Navbar.Content>

      <Navbar.Collapse>
        {collapseLinks.map((link) => (
          <Navbar.CollapseItem key={link.name} isActive={location.pathname === link.to}>
            <Link color='inherit' to={link.to} as={NavLink}>
              {link.name}
            </Link>
          </Navbar.CollapseItem>
        ))}
        <Divider />
        <Navbar.CollapseItem css={{ d: 'flex', flexDirection: 'column', py: '$6' }}>
          <Row>
            <Text span css={{ mr: '$2' }}>
              Hi
            </Text>
            <Text span b>
              {user.username}
            </Text>
          </Row>
          <Row>
            <Text span>You have</Text>
            <Text span b css={{ mx: '$2' }}>
              {user.points}
            </Text>
            <Text span>points!</Text>
          </Row>
        </Navbar.CollapseItem>
        <Divider css={{ mb: '$5' }} />
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
