import { Button, Container, Spacer, Text } from '@nextui-org/react'
import { FormInput } from '@/components/FormInput'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { createPost } from '@/requests'
import { AsyncToast } from '@/util/toast'

const NewPostPage = () => {
  const initialValues = {
    title: '',
    body: ''
  }

  const schema = Yup.object({
    title: Yup.string().required('Required field'),
    body: Yup.string().required('Required field')
  })

  const onSubmit = async ({ title, body }: typeof initialValues) => {
    const toast = new AsyncToast('Creating post')
    try {
      await createPost(title, body)
      toast.success('Post created!')
    } catch (e) {
      toast.error(e)
    }
  }

  return (
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
  )
}

export default NewPostPage
