import { Grid, Row, Pagination, Card, Text } from '@nextui-org/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCommentsQuery } from '@/store/api'
import { useState } from 'react'
import CommentCard from '@/components/CommentCard'

const UserCommentsPage = () => {
  const params = useParams() as { id: string }
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  const commentsQuery = useGetCommentsQuery({ page, author: parseInt(params.id) })

  if (!commentsQuery.data) return <>Loading</>
  if (commentsQuery.isError) return <>Error</>

  return (
    <>
      <Grid.Container gap={3} css={{ px: 0, py: '$10' }}>
        {commentsQuery.data.comments.map((comment) => (
          <Grid key={comment.id} xs={12} direction='column'>
            <Card
              isPressable
              onPress={() => navigate(`/post/${comment.post.id}`)}
              variant='bordered'
              css={{ p: '$8', backgroundColor: 'transparent' }}
            >
              <Text h4>{comment.post.title}</Text>
              <CommentCard comment={comment} />
            </Card>
          </Grid>
        ))}
      </Grid.Container>

      <Row css={{ py: '$10' }} justify='center'>
        <Pagination
          page={page}
          total={commentsQuery.data.totalPages}
          onChange={(p) => setPage(p)}
        />
      </Row>
    </>
  )
}
export default UserCommentsPage
