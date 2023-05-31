import { AxiosError } from 'axios'
import { Id, toast } from 'react-toastify'

interface AsyncToastOptions {
  delay?: number
  closeAfter?: number
}

export class AsyncToast {
  state: 'progress' | 'error' | 'success'
  id: Id
  delay = 500
  closeAfter = 5000

  constructor(text: string, options?: AsyncToastOptions) {
    this.state = 'progress'
    this.id = toast.loading(text)

    if (options) {
      if (options.delay) this.delay = options.delay
      if (options.closeAfter) this.closeAfter = options.closeAfter
    }
  }

  success(text: string) {
    if (this.state === 'progress') {
      toast.update(this.id, {
        render: text,
        type: 'success',
        isLoading: false,
        delay: this.delay,
        autoClose: this.closeAfter
      })
      this.state = 'success'
    }
  }

  error(error: AxiosError | unknown) {
    if (this.state === 'progress') {
      if (error instanceof AxiosError && error.response) {
        toast.update(this.id, {
          render: error.response.data.message,
          type: 'error',
          isLoading: false,
          delay: this.delay,
          autoClose: this.closeAfter
        })
      } else {
        toast.update(this.id, {
          render: 'Unexpected error',
          type: 'error',
          isLoading: false,
          delay: this.delay,
          autoClose: this.closeAfter
        })
      }
      this.state = 'error'
    }
  }
}
