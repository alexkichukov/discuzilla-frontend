import { Card, Grid, Link, Text } from '@nextui-org/react'
import { FaRegHeart, FaHeart, FaComment } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { likePost } from '@/requests'
import removeMd from 'remove-markdown'
import moment from 'moment'

interface Props {
  post: SimplifiedPost
  onLike: () => void
}

const Post = ({ post, onLike }: Props) => {
  const navigate = useNavigate()

  const like = async () => {
    try {
      await likePost(post.id)
      onLike()
    } catch {
      toast.error('Could not like post')
    }
  }

  return (
    <Card isPressable onPress={() => navigate(`/post/${post.id}`)}>
      <Card.Header>
        <Text size='$lg' b>
          {post.title}
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: '$5', minHeight: '120px' }}>
        <Grid.Container alignItems='center'>
          <Grid>
            <Link as={NavLink} to={`/user/${post.author.id}`}>
              {post.author.username}
            </Link>
          </Grid>
          <Grid css={{ ml: 'auto' }}>
            <Text size='$sm' span color='$gray800'>
              {moment(post.date).format('DD/MM/yyyy')}
            </Text>
          </Grid>
        </Grid.Container>
        <Text span color='$gray800' css={{ mt: '$2' }}>
          {removeMd(post.body)}
        </Text>
      </Card.Body>
      <Card.Divider />
      <Card.Footer css={{ py: '$3' }}>
        <Card
          variant='flat'
          isPressable
          onPress={() => like()}
          css={{ d: 'flex', flexDirection: 'row', width: 'auto', px: '$5', py: '$4', mr: 'auto' }}
        >
          {post.isLiked ? (
            <FaHeart size={20} color='#ff006a' />
          ) : (
            <FaRegHeart size={20} color='#ff006a' />
          )}
          <Text size='$sm' b css={{ ml: '$4' }} span>
            {post.likeCount} like{post.likeCount !== 1 && 's'}
          </Text>
        </Card>
        <Card
          variant='flat'
          css={{ d: 'flex', flexDirection: 'row', width: 'auto', px: '$5', py: '$4' }}
        >
          <Text size='$sm' b css={{ mr: '$4' }} span>
            {post.commentCount} Comments
          </Text>
          <FaComment size={20} color='#ff006a' />
        </Card>
      </Card.Footer>
    </Card>
  )
}

export default Post
