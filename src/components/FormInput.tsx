import { Input, InputProps, Textarea } from '@nextui-org/react'
import { TextareaProps } from '@nextui-org/react/types/textarea'
import { useField } from 'formik'

const FormInput = ({ name, ...props }: { name: string } & Partial<InputProps>) => {
  const [field, meta] = useField(name)

  return (
    <Input
      {...field}
      {...props}
      helperText={meta.error && meta.touched ? meta.error : undefined}
      helperColor='error'
    />
  )
}

const FormInputPassword = ({ name, ...props }: { name: string } & Partial<InputProps>) => {
  const [field, meta] = useField(name)
  return (
    <Input.Password
      {...field}
      {...props}
      helperText={meta.error && meta.touched ? meta.error : undefined}
      helperColor='error'
    />
  )
}

const FormInputTextarea = ({ name, ...props }: { name: string } & Partial<TextareaProps>) => {
  const [field, meta] = useField(name)
  return (
    <Textarea
      {...field}
      {...props}
      helperText={meta.error && meta.touched ? meta.error : undefined}
      helperColor='error'
    />
  )
}

FormInput.Password = FormInputPassword
FormInput.Textarea = FormInputTextarea
export default FormInput
