import { Button, Col, Container, Popover, Row, Spacer, Text } from '@nextui-org/react'
import { useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation } from '@/store/api'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from '@/hooks'
import FormInput from '@/components/FormInput'
import AnimateIn from '@/components/AnimateIn'
import Loading from '@/components/Loading'
import * as Yup from 'yup'
import { deauthenticate } from '@/store/auth'

const SettingsPage = () => {
  const userID = useSelector((state) => state.auth.user!.id)
  const dispatch = useDispatch()
  const userQuery = useGetUserQuery(userID)
  const [updateUser] = useUpdateUserMutation()
  const [deleteUser] = useDeleteUserMutation()

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

  const remove = async () => {
    try {
      await deleteUser()
      dispatch(deauthenticate())
    } catch {
      toast.error('Could not delete account')
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

        <Text h2 css={{ pt: '$15', pb: '$5' }}>
          Delete your account
        </Text>
        <Popover>
          <Popover.Trigger>
            <Button color='error' size='lg' css={{ w: '100%' }}>
              <MdDelete size={20} style={{ marginRight: 5 }} />
              Delete
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <Col
              css={{
                p: '$10',
                d: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 200
              }}
            >
              <Text b size='$lg'>
                Are you sure?
              </Text>
              <Button onClick={() => remove()} color='error' auto css={{ w: '100%', mt: '$5' }}>
                Confirm
              </Button>
            </Col>
          </Popover.Content>
        </Popover>
      </Container>
    </AnimateIn>
  )
}

export default SettingsPage
