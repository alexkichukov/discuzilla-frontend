import { Button, Card, Grid, Link, Row, Text, Textarea } from '@nextui-org/react'
import {
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUpdateCommentMutation
} from '@/store/api'
import { MdEdit, MdCancel, MdDelete } from 'react-icons/md'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector } from '@/hooks'
import { useState } from 'react'
import moment from 'moment'
import '@/assets/styles/github-markdown.css'

interface Props {
  comment: PostComment
  disableEditing?: boolean
}

const CommentCard = ({ comment, disableEditing }: Props) => {
  const user = useSelector((state) => state.auth.user!)
  const [editMode, setEditMode] = useState(false)
  const [editedText, setEditedText] = useState(comment.body)
  const [likeComment] = useLikeCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()
  const [updateComment] = useUpdateCommentMutation()

  const like = async () => {
    try {
      await likeComment(comment.id)
    } catch {
      toast.error('Could not like comment')
    }
  }

  const update = async () => {
    try {
      await updateComment({ id: comment.id, comment: editedText })
    } catch {
      toast.error('Could not update comment')
    } finally {
      setEditMode(false)
    }
  }

  const remove = async () => {
    try {
      await deleteComment(comment.id)
    } catch {
      toast.error('Could not delete comment')
    }
  }

  const userControls = (
    <>
      {editMode && (
        <Button
          color='primary'
          size='sm'
          auto
          onPress={() => update()}
          disabled={editedText.trim().length === 0}
        >
          Save
        </Button>
      )}
      <Button
        color='primary'
        light
        size='sm'
        auto
        onPress={() => setEditMode((p) => !p)}
        icon={editMode ? <MdCancel size={16} /> : <MdEdit size={16} />}
        css={{ px: '$4', mx: '$5' }}
      >
        {editMode ? 'Cancel' : 'Edit'}
      </Button>
      <Button color='error' light size='sm' auto onPress={() => remove()} css={{ px: '$4' }}>
        <MdDelete size={16} />
      </Button>
    </>
  )

  return (
    <Card css={{ pt: '$8', pb: '$4', px: '$8' }}>
      <Grid.Container css={{ columnGap: '$6' }}>
        <Grid xs>
          <Link css={{ mr: '$2' }}>{comment.author.username}</Link>
          <Text color='$gray800'>on {moment(comment.date).format('DD/MM/yyyy')}</Text>
        </Grid>

        {editMode ? (
          <Textarea
            aria-label='Edit comment'
            animated={false}
            shadow={false}
            minRows={1}
            maxRows={9999}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            fullWidth
            style={{
              padding: 0,
              margin: 'var(--nextui-space-3) 0',
              fontSize: 'var(--nextui-fontSizes-base)'
            }}
          />
        ) : (
          <Text span css={{ my: '$3', w: '100%', whiteSpace: 'pre-wrap' }} color='$gray800'>
            {comment.body}
          </Text>
        )}

        <Row>
          <Card
            variant='flat'
            isPressable
            onPress={() => like()}
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
            {comment.isLiked ? (
              <FaHeart size={20} color='#ff006a' />
            ) : (
              <FaRegHeart size={20} color='#ff006a' />
            )}
            <Text b css={{ ml: '$4' }}>
              {comment.likeCount} like{comment.likeCount !== 1 && 's'}
            </Text>
          </Card>
          {user.id === comment.author.id && !disableEditing && userControls}
        </Row>
      </Grid.Container>
    </Card>
  )
}

export default CommentCard
