import { Button, Spacer } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { authenticate } from '@/store/auth'
import { useDispatch } from '@/hooks'
import * as Yup from 'yup'
import { FormInput } from '@/components/FormInput'
import { login } from '@/requests/auth'
import { AsyncToast } from '@/util/toast'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    username: '',
    password: ''
  }

  const schema = Yup.object({
    username: Yup.string().required('Required field'),
    password: Yup.string().required('Required field').min(8, 'At least 8 characters')
  })

  const onSubmit = async ({ username, password }: typeof initialValues) => {
    const toast = new AsyncToast('Logging in...')

    try {
      const token = await login(username, password)
      dispatch(authenticate(token))
      navigate('/', { replace: true })
      toast.success('Successfully logged in!')
    } catch (e) {
      toast.error(e)
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      {({ submitForm }) => (
        <Form>
          <FormInput
            name='username'
            id='username'
            placeholder='Username'
            label='Username'
            fullWidth
            bordered
          />
          <Spacer y={1} />
          <FormInput
            password
            name='password'
            id='password'
            label='Password'
            placeholder='Must be least 8 characters'
            fullWidth
            bordered
          />
          <Spacer y={2} />
          <Button onPress={submitForm} css={{ width: '100%' }} color='gradient'>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
