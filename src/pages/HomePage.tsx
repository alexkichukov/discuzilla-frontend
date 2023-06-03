import { Container, Grid, Text } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { getAllPosts } from '@/requests'
import { toast } from 'react-toastify'
import Post from '@/components/Post'

const HomePage = () => {
  const [posts, setPosts] = useState<SimplifiedPost[]>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllPosts()
        setPosts(data)
      } catch (e) {
        toast.error('Could not load posts')
      }
    }
    getData()
  }, [])

  const updateLikedPost = (i: number) => {
    const newPosts = [...posts]
    const { isLiked, likeCount } = newPosts[i]
    newPosts[i].isLiked = !isLiked
    newPosts[i].likeCount = isLiked ? likeCount - 1 : likeCount + 1
    setPosts(newPosts)
  }

  return (
    <Container sm css={{ py: '$8' }}>
      <Text size='$3xl' css={{ my: '$10' }}>
        Top posts
      </Text>

      <Grid.Container gap={3} css={{ padding: 0 }}>
        {posts.map((post, i) => (
          <Grid key={post.id} sm={6}>
            <Post post={post} onLike={() => updateLikedPost(i)} />
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  )
}

export default HomePage
