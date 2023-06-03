import { Button, Card, Container, Grid, Input, Link, Row, Text, Textarea } from '@nextui-org/react'
import {
  useDeletePostMutation,
  useGetPostQuery,
  useLikePostMutation,
  useUpdatePostMutation
} from '@/store/api'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { FaComment, FaHeart, FaRegHeart } from 'react-icons/fa'
import { NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from '@/hooks'
import { useEffect, useState } from 'react'
import NewCommentForm from '@/components/NewCommentForm'
import CommentCard from '@/components/CommentCard'
import AnimateIn from '@/components/AnimateIn'
import remarkGfm from 'remark-gfm'
import moment from 'moment'
import '@/assets/styles/github-markdown.css'
import { MdCancel, MdDelete, MdEdit } from 'react-icons/md'

const PostPage = () => {
  const params = useParams<{ id: string }>()
  const id = parseInt(params.id!)

  const user = useSelector((state) => state.auth.user!)
  const [editMode, setEditMode] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedText, setEditedText] = useState('')

  const postQuery = useGetPostQuery(id)
  const [likePost] = useLikePostMutation()
  const [updatePost] = useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation()

  // Update the edit inputs when new data comes in
  useEffect(() => {
    if (postQuery.isSuccess && !postQuery.isFetching) {
      setEditedText(postQuery.data.body)
      setEditedTitle(postQuery.data.title)
    }
  }, [postQuery])

  if (postQuery.isLoading) return <>Loading</>
  else if (postQuery.isError || !postQuery.isSuccess)
    return <>Error {(postQuery.error as any).data.message}</>

  const post = postQuery.data

  const like = async () => {
    try {
      await likePost(id)
    } catch {
      toast.error('Could not like post')
    }
  }

  const update = async () => {
    try {
      await updatePost({ id, title: editedTitle, body: editedText })
      setEditMode(false)
    } catch {
      toast.error('Could not update post')
    }
  }

  const remove = async () => {
    try {
      await deletePost(id)
    } catch {
      toast.error('Could not update post')
    }
  }

  const userControls = (
    <>
      {editMode && (
        <Button
          color='primary'
          size='lg'
          auto
          onPress={() => update()}
          disabled={editedText.trim().length === 0 || editedTitle.trim().length === 0}
          css={{ mr: '$5' }}
        >
          Save
        </Button>
      )}
      <Button
        color='primary'
        light
        size='lg'
        auto
        onPress={() => setEditMode((p) => !p)}
        icon={editMode ? <MdCancel size={20} /> : <MdEdit size={20} />}
        css={{ px: '$4', mr: '$5' }}
      >
        {editMode ? 'Cancel' : 'Edit'}
      </Button>
      <Button
        color='error'
        light
        size='lg'
        auto
        onPress={() => remove()}
        css={{ px: '$4', mr: '$5' }}
        icon={<MdDelete size={20} />}
      >
        Delete
      </Button>
    </>
  )

  return (
    <AnimateIn>
      <Container sm css={{ pt: '$10', pb: '$20' }}>
        <Row css={{ mb: '$10' }}>{user.id === post.author.id && userControls}</Row>

        {editMode ? (
          <>
            <Input
              label='Title'
              size='lg'
              fullWidth
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <Textarea
              size='lg'
              label='Body'
              fullWidth
              minRows={5}
              maxRows={9999}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              css={{ mt: '$10' }}
            />
          </>
        ) : (
          <>
            <Row css={{ d: 'flex', gap: '$10' }}>
              <Text h2 css={{ maxWidth: '600px' }}>
                {post.title}
              </Text>
              <Button
                auto
                light
                bordered
                size='lg'
                onPress={like}
                css={{ ml: 'auto', px: '$6', borderColor: '#ff006a', color: 'white' }}
                icon={
                  post.isLiked ? (
                    <FaHeart size={20} color='#ff006a' />
                  ) : (
                    <FaRegHeart size={20} color='#ff006a' />
                  )
                }
              >
                {post.likeCount} like{post.likeCount !== 1 && 's'}
              </Button>
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
              <ReactMarkdown
                className='markdown-body'
                children={post.body}
                remarkPlugins={[remarkGfm]}
              />
            </Card>
          </>
        )}

        <Grid.Container css={{ py: '$15' }} justify='center' alignItems='center'>
          <Text size='$xl' b css={{ mr: '$4' }}>
            Comments ({post.comments.length})
          </Text>
          <FaComment size={20} />
        </Grid.Container>

        <NewCommentForm postID={post.id} />

        <Grid.Container css={{ rowGap: '$14', mt: '$16' }}>
          {post.comments.map((comment) => (
            <Grid key={comment.id} xs={12}>
              <CommentCard comment={comment} />
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </AnimateIn>
  )
}

export default PostPage
