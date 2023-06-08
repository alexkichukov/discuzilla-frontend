import { Button, Container, Spacer, Text } from '@nextui-org/react'
import { useGetUserQuery, useUpdateUserMutation } from '@/store/api'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import { useSelector } from '@/hooks'
import FormInput from '@/components/FormInput'
import AnimateIn from '@/components/AnimateIn'
import Loading from '@/components/Loading'
import * as Yup from 'yup'

const SettingsPage = () => {
  const userID = useSelector((state) => state.auth.user!.id)
  const userQuery = useGetUserQuery(userID)
  const [updateUser] = useUpdateUserMutation()

  if (!userQuery.data)
    return (
      <Container sm>
        <Loading />
      </Container>
    )
  if (userQuery.isError) return <Container sm>Error</Container>

  const initialValues = {
    username: userQuery.data.username,
    email: userQuery.data.email
  }

  const schema = Yup.object({
    username: Yup.string().required('Required field').min(3, 'At least 3 characters'),
    email: Yup.string().email('Invalid email')
  })

  const onSubmit = async ({ username, email }: typeof initialValues) => {
    try {
      await updateUser({ username, email })
      toast.success('Your data has been updated!')
    } catch (e) {
      toast.error('Error while updating your data')
    }
  }

  return (
    <AnimateIn>
      <Container sm css={{ py: '$15' }}>
        <Text h2 css={{ pb: '$5' }}>
          Update your data
        </Text>

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
          {({ submitForm, values, errors }) => (
            <Form>
              <FormInput
                name='username'
                id='username'
                placeholder={`username`}
                label='Username'
                fullWidth
                bordered
              />
              <Spacer y={1} />
              <FormInput
                name='email'
                id='email'
                placeholder={`email`}
                label='Email'
                fullWidth
                bordered
              />
              <Spacer y={2} />
              <Button
                onPress={submitForm}
                css={{ width: '100%' }}
                color='gradient'
                disabled={
                  (userQuery.data.username === values.username &&
                    userQuery.data.email === values.email) ||
                  Boolean(errors.username) ||
                  Boolean(errors.email)
                }
              >
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </AnimateIn>
  )
}

export default SettingsPage
