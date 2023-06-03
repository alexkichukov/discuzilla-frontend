import { FormInput } from '@/components/FormInput'
import { Button, Spacer } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { authenticate } from '@/store/auth'
import { AsyncToast } from '@/util/toast'
import { register } from '@/requests'
import { Formik, Form } from 'formik'
import { useDispatch } from '@/hooks'
import * as Yup from 'yup'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const schema = Yup.object({
    username: Yup.string().required('Required field'),
    email: Yup.string().email('Invalid email'),
    password: Yup.string().required('Required field').min(8, 'At least 8 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password must match')
  })

  const onSubmit = async ({ username, password, email }: typeof initialValues) => {
    const toast = new AsyncToast('Signing up...')

    try {
      const user = await register(username, password, email)
      dispatch(authenticate(user))
      navigate('/', { replace: true })
      toast.success('Successfully signed up!')
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
          <FormInput name='email' id='email' placeholder='Email' label='Email' fullWidth bordered />
          <Spacer y={1} />
          <FormInput.Password
            name='password'
            id='password'
            label='Password'
            placeholder='Must be least 8 characters'
            fullWidth
            bordered
          />
          <Spacer y={1} />
          <FormInput.Password
            name='confirmPassword'
            id='confirmPassword'
            label='Confirm Password'
            placeholder='Must match password'
            fullWidth
            bordered
          />
          <Spacer y={2} />

          <Button onPress={submitForm} css={{ width: '100%' }} color='gradient'>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm
