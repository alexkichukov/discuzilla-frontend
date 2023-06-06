import { Button, Container, Spacer, Text } from '@nextui-org/react'
import { useAddPostMutation } from '@/store/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import FormInput from '@/components/FormInput'
import AnimateIn from '@/components/AnimateIn'
import * as Yup from 'yup'

const NewPostPage = () => {
  const [addPost] = useAddPostMutation()
  const navigate = useNavigate()

  const initialValues = {
    title: '',
    body: ''
  }

  const schema = Yup.object({
    title: Yup.string().required('Required field'),
    body: Yup.string().required('Required field')
  })

  const onSubmit = async ({ title, body }: typeof initialValues) => {
    try {
      const { id } = await addPost({ title, body }).unwrap()
      toast.success('Post created!')
      navigate(`/post/${id}`, { replace: true })
    } catch (e) {
      toast.error('Error while creating post')
    }
  }

  return (
    <AnimateIn>
      <Container sm css={{ py: '$15' }}>
        <Text h2 css={{ pb: '$5' }}>
          New Post
        </Text>

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
          {({ submitForm }) => (
            <Form>
              <FormInput
                name='title'
                id='title'
                placeholder={`What's on your mind?`}
                label='Title'
                fullWidth
                bordered
              />
              <Spacer y={1} />
              <FormInput.Textarea
                name='body'
                id='body'
                label='Body'
                placeholder='Body'
                fullWidth
                bordered
                css={{ h: '100%', maxH: '100%' }}
                rows={20}
              />
              <Spacer y={2} />
              <Button onPress={submitForm} css={{ width: '100%' }} color='gradient'>
                Post
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </AnimateIn>
  )
}

export default NewPostPage
