import { Container, Grid, Pagination, Row, Text } from '@nextui-org/react'
import { useGetPostsQuery } from '@/store/api'
import { useEffect, useState } from 'react'
import AnimateIn from '@/components/AnimateIn'
import PostCard from '@/components/PostCard'

const HomePage = () => {
  const [page, setPage] = useState(1)
  const [postsPage, setPostsPage] = useState<PostsPage | null>(null)

  const postsQuery = useGetPostsQuery({ page }, { refetchOnMountOrArgChange: true })

  useEffect(() => {
    if (postsQuery.data) setPostsPage(postsQuery.data)
  }, [postsQuery])

  if (!postsPage) return <Container sm>Loading</Container>

  return (
    <AnimateIn>
      <Container sm css={{ py: '$8' }}>
        <Text size='$3xl' css={{ my: '$10' }}>
          Posts
        </Text>

        <Grid.Container gap={3} css={{ padding: 0 }}>
          {postsPage.posts.map((post) => (
            <Grid key={post.id} sm={6}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid.Container>

        <Row css={{ py: '$10' }} justify='center'>
          <Pagination page={page} total={postsPage.totalPages} onChange={(p) => setPage(p)} />
        </Row>
      </Container>
    </AnimateIn>
  )
}

export default HomePage
