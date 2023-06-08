import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetUserQuery } from '@/store/api'
import { Button, Container, Row, Text } from '@nextui-org/react'
import AnimateIn from '@/components/AnimateIn'
import Loading from '@/components/Loading'

const UserPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams() as { id: string }
  const userQuery = useGetUserQuery(params.id)

  if (!userQuery.data)
    return (
      <Container sm>
        <Loading />
      </Container>
    )
  if (userQuery.isError) return <Container sm>Error</Container>

  const postsLink = `/user/${userQuery.data.id}/posts`
  const commentsLink = `/user/${userQuery.data.id}/comments`

  return (
    <AnimateIn>
      <Container sm>
        <Text h2>{userQuery.data.username}</Text>
        <Text h4>Points: {userQuery.data.points}</Text>
        <Row css={{ my: '$10' }}>
          <Button
            onPress={() => navigate(postsLink)}
            color={location.pathname === postsLink ? 'gradient' : undefined}
            light={location.pathname !== postsLink}
            css={{ w: '100%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            Posts
          </Button>
          <Button
            onPress={() => navigate(commentsLink)}
            color={location.pathname === commentsLink ? 'gradient' : undefined}
            light={location.pathname !== commentsLink}
            css={{ w: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            Comments
          </Button>
        </Row>
        <Outlet />
      </Container>
    </AnimateIn>
  )
}

export default UserPage
