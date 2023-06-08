import { Grid, Row, Pagination, Container } from '@nextui-org/react'
import { useGetPostsQuery } from '@/store/api'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import PostCard from '@/components/PostCard'
import Loading from '@/components/Loading'
import NoData from '@/components/NoData'

const UserPostsPage = () => {
  const params = useParams() as { id: string }
  const [page, setPage] = useState(1)

  const postsQuery = useGetPostsQuery({ page, author: params.id })

  if (!postsQuery.data)
    return (
      <Container sm>
        <Loading />
      </Container>
    )
  if (postsQuery.isError) return <Container sm>Error</Container>

  return (
    <>
      {postsQuery.data.posts.length === 0 ? (
        <NoData text='User has not created any posts' />
      ) : (
        <>
          <Grid.Container gap={3} css={{ px: 0, py: '$10' }}>
            {postsQuery.data.posts.map((post) => (
              <Grid key={post.id} sm={6}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid.Container>

          <Row css={{ py: '$10' }} justify='center'>
            <Pagination
              page={page}
              total={postsQuery.data.totalPages}
              onChange={(p) => setPage(p)}
            />
          </Row>
        </>
      )}
    </>
  )
}
export default UserPostsPage
