import { useGetPostsQuery } from '@/store/api'
import { useParams } from 'react-router-dom'
import { Grid, Row, Pagination } from '@nextui-org/react'
import { useState } from 'react'
import PostCard from '@/components/PostCard'

const UserPostsPage = () => {
  const params = useParams() as { id: string }
  const [page, setPage] = useState(1)

  const postsQuery = useGetPostsQuery({ page, author: parseInt(params.id) })

  if (!postsQuery.data) return <>Loading</>
  if (postsQuery.isError) return <>Error</>

  return (
    <>
      <Grid.Container gap={3} css={{ px: 0, py: '$10' }}>
        {postsQuery.data.posts.map((post) => (
          <Grid key={post.id} sm={6}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid.Container>

      <Row css={{ py: '$10' }} justify='center'>
        <Pagination page={page} total={postsQuery.data.totalPages} onChange={(p) => setPage(p)} />
      </Row>
    </>
  )
}
export default UserPostsPage
