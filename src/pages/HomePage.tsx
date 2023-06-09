import { Container, Grid, Input, Pagination, Row, Text } from '@nextui-org/react'
import { useGetPostsQuery } from '@/store/api'
import React, { useEffect, useState } from 'react'
import AnimateIn from '@/components/AnimateIn'
import PostCard from '@/components/PostCard'
import Loading from '@/components/Loading'
import NoData from '@/components/NoData'

const HomePage = () => {
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [postsPage, setPostsPage] = useState<PostsPage | null>(null)

  const postsQuery = useGetPostsQuery({ page, search }, { refetchOnMountOrArgChange: true })

  useEffect(() => {
    if (postsQuery.data) setPostsPage(postsQuery.data)
  }, [postsQuery])

  // Debounce search parameter
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 200)
    return () => clearTimeout(t)
  }, [searchInput])

  if (!postsPage)
    return (
      <Container sm>
        <Loading />
      </Container>
    )

  return (
    <AnimateIn>
      <Container sm css={{ py: '$8' }}>
        <Text size='$3xl' css={{ my: '$10' }}>
          Posts
        </Text>

        <Input
          placeholder='Search for title, content or author'
          label='Search'
          size='lg'
          fullWidth
          css={{ mb: '$15' }}
          onChange={(e) => setSearchInput(e.target.value.trim())}
        />

        {postsPage.posts.length === 0 ? (
          <NoData text='There are no posts yet' />
        ) : (
          <>
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
          </>
        )}
      </Container>
    </AnimateIn>
  )
}

export default HomePage
