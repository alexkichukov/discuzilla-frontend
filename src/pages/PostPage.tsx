import { Card, Container, Grid, Link, Row, Text } from '@nextui-org/react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { FaComment, FaHeart, FaRegHeart } from 'react-icons/fa'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getPost, likePost } from '@/requests'
import remarkGfm from 'remark-gfm'
import moment from 'moment'
import '@/assets/styles/github-markdown.css'

const PostPage = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getPost(id!)
        setPost(data)
      } catch (e) {
        toast.error('Could not load post')
      }
    }
    getData()
  }, [])

  if (!post) return <Container sm>Loading</Container>

  const like = async () => {
    try {
      await likePost(post.id)
      setPost({
        ...post,
        isLiked: !post.isLiked,
        likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1
      })
    } catch {
      toast.error('Could not like post')
    }
  }

  return (
    <Container sm css={{ pt: '$10', pb: '$20' }}>
      <Row css={{ d: 'flex', flexDirection: 'row' }}>
        <Text h2 css={{ maxWidth: '600px' }}>
          {post.title}
        </Text>
        <Card
          variant='bordered'
          isPressable
          onPress={like}
          css={{
            d: 'flex',
            w: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            ml: 'auto',
            px: '$6',
            py: '$5',
            fontSize: '$base',
            backgroundColor: 'transparent'
          }}
        >
          {post.isLiked ? (
            <FaHeart size={20} color='#ff006a' />
          ) : (
            <FaRegHeart size={20} color='#ff006a' />
          )}
          <Text b css={{ pl: '$4' }}>
            {post.likeCount} like{post.likeCount !== 1 && 's'}
          </Text>
        </Card>
      </Row>
      <Row css={{ pt: '$5', pb: '$12' }}>
        <Link css={{ mr: '$2' }} as={NavLink} to={`/user/${post.author.id}`}>
          {post.author.username}
        </Link>
        <Text size='$md' span color='$gray800'>
          on {moment(post.date).format('DD/MM/yyyy')}
        </Text>
      </Row>
      <Card css={{ p: '$8' }}>
        <ReactMarkdown className='markdown-body' children={post.body} remarkPlugins={[remarkGfm]} />
      </Card>

      <Grid.Container css={{ py: '$15' }} justify='center' alignItems='center'>
        <Text size='$xl' b css={{ mr: '$4' }}>
          Comments ({post.comments.length})
        </Text>
        <FaComment size={20} />
      </Grid.Container>

      <Grid.Container css={{ rowGap: '$10' }}>
        <Grid xs={12}>
          <Card css={{ pt: '$8', pb: '$4', px: '$8' }}>
            <Grid.Container css={{ columnGap: '$6' }}>
              <Grid xs>
                <Link css={{ mr: '$2' }}>alex</Link>
                <Text color='$gray800'>on 24/04/2032</Text>
              </Grid>
              <Text span css={{ my: '$3' }} color='$gray800'>
                I was at the bar drinking with some friends. I drank more and more deeper into the
                night, and ended up throwing up all over my shirt. "Ah shit my wife's going to kill
                me! She's going to know i stayed out all night and got drunk! "
              </Text>
              <Card
                variant='flat'
                isPressable
                css={{
                  d: 'flex',
                  flexDirection: 'row',
                  width: 'auto',
                  fontSize: '$sm',
                  px: '$2',
                  py: '$4',
                  mr: 'auto'
                }}
              >
                <FaRegHeart size={20} color='#ff006a' />
                <Text b css={{ ml: '$4' }}>
                  32 likes
                </Text>
              </Card>
            </Grid.Container>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  )
}

export default PostPage
