import { Grid, Row, Pagination, Card, Text, Container } from '@nextui-org/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCommentsQuery } from '@/store/api'
import { FiArrowRight } from 'react-icons/fi'
import { useState } from 'react'
import CommentCard from '@/components/CommentCard'
import Loading from '@/components/Loading'
import NoData from '@/components/NoData'

const UserCommentsPage = () => {
  const params = useParams() as { id: string }
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  const commentsQuery = useGetCommentsQuery({ page, author: params.id })

  if (!commentsQuery.data)
    return (
      <Container sm>
        <Loading />
      </Container>
    )
  if (commentsQuery.isError) return <Container sm>Error</Container>

  return (
    <>
      {commentsQuery.data.comments.length === 0 ? (
        <NoData text='User has not created any comments' />
      ) : (
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
                  <Row css={{ alignItems: 'center', color: '$primary', mb: '$8' }}>
                    <Text h4 css={{ m: 0, p: 0, mr: '$5' }}>
                      {comment.post.title}
                    </Text>
                    <FiArrowRight size={20} />
                  </Row>
                  <CommentCard comment={comment} disableEditing />
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
      )}
    </>
  )
}
export default UserCommentsPage
