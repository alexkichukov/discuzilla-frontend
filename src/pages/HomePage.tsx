import { Container, Grid, Text } from '@nextui-org/react'
import { useGetPostsQuery } from '@/store/api'
import PostCard from '@/components/PostCard'
import AnimateIn from '@/components/AnimateIn'

const HomePage = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error
  } = useGetPostsQuery(undefined, { refetchOnMountOrArgChange: true })

  if (isLoading) return <>Loading</>
  else if (isError) return <>Error {(error as any).data.message}</>

  return (
    <AnimateIn>
      <Container sm css={{ py: '$8' }}>
        <Text size='$3xl' css={{ my: '$10' }}>
          Top posts
        </Text>

        <Grid.Container gap={3} css={{ padding: 0 }}>
          {posts!.map((post, i) => (
            <Grid key={post.id} sm={6}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </AnimateIn>
  )
}

export default HomePage
