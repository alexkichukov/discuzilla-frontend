import { Card, Col, Container, Grid, Pagination, Row, Text } from '@nextui-org/react'
import { useGetLeaderboardQuery } from '@/store/api'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AnimateIn from '@/components/AnimateIn'
import Loading from '@/components/Loading'
import NoData from '@/components/NoData'

const leaderboardColors = ['#af9a21', '#6d6a60', '#6e5648', '#333333']

const LeaderboardPage = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [leaderboardPage, setLeaderboardPage] = useState<LeaderboardPage | null>(null)

  const leaderboardQuery = useGetLeaderboardQuery({ page }, { refetchOnMountOrArgChange: true })

  useEffect(() => {
    if (leaderboardQuery.data) setLeaderboardPage(leaderboardQuery.data)
  }, [leaderboardQuery])

  if (!leaderboardPage)
    return (
      <Container sm>
        <Loading />
      </Container>
    )

  return (
    <AnimateIn>
      <Container sm css={{ py: '$8' }}>
        <Text size='$3xl' css={{ my: '$10' }}>
          Leaderboard
        </Text>

        {leaderboardPage.users.length === 0 ? (
          <NoData text='There are no users on the leaderboard yet' />
        ) : (
          <>
            <Grid.Container gap={1} css={{ padding: 0 }}>
              {leaderboardPage.users.map((user, index) => (
                <Grid key={user.id} xs={12}>
                  <Card
                    css={{ flexDirection: 'row', alignItems: 'center' }}
                    isPressable
                    onPress={() => navigate(`/user/${user.id}`)}
                  >
                    <Col
                      css={{
                        w: 50,
                        h: 50,
                        d: 'flex',
                        background: leaderboardColors[index > 3 ? 3 : index],
                        alignItems: 'center',
                        fontWeight: '$bold',
                        fontSize: '$xl',
                        justifyContent: 'center'
                      }}
                    >
                      {index + 1}
                    </Col>
                    <Col css={{ px: '$8', fontSize: '$lg' }}>
                      {user.username} ({user.points} points)
                    </Col>
                  </Card>
                </Grid>
              ))}
            </Grid.Container>

            <Row css={{ py: '$10' }} justify='center'>
              <Pagination
                page={page}
                total={leaderboardPage.totalPages}
                onChange={(p) => setPage(p)}
              />
            </Row>
          </>
        )}
      </Container>
    </AnimateIn>
  )
}

export default LeaderboardPage
