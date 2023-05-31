import { Input, InputProps } from '@nextui-org/react'
import { useField } from 'formik'

interface Props extends Partial<InputProps> {
  name: string
  password?: boolean
}

const FormInput = ({ name, password, ...props }: Props) => {
  const [field, meta] = useField(name)

  if (password) {
    return (
      <Input.Password
        {...field}
        {...props}
        helperText={meta.error && meta.touched ? meta.error : undefined}
        helperColor='error'
      />
    )
  }

  return (
    <Input
      {...field}
      {...props}
      helperText={meta.error && meta.touched ? meta.error : undefined}
      helperColor='error'
    />
  )
}

export default FormInput
