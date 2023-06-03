import { useAddCommentMutation } from '@/store/api'
import { Button, Spacer } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import FormInput from '@/components/FormInput'
import * as Yup from 'yup'

interface Props {
  postID: number
}

const NewCommentForm = ({ postID }: Props) => {
  const [addComment] = useAddCommentMutation()

  const initialValues = {
    comment: ''
  }

  const schema = Yup.object({
    comment: Yup.string().required('Required field')
  })

  const onSubmit = async ({ comment }: typeof initialValues) => {
    try {
      await addComment({ id: postID, comment: comment })
      toast.success('Comment submitted!')
    } catch {
      toast.error('Error while creating comment')
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      {({ submitForm }) => (
        <Form>
          <FormInput.Textarea
            name='comment'
            id='comment'
            label='Comment'
            placeholder='Comment'
            fullWidth
            bordered
            rows={5}
          />
          <Spacer y={1.2} />
          <Button onPress={submitForm} css={{ width: '100%' }} color='gradient'>
            Post Comment
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default NewCommentForm
