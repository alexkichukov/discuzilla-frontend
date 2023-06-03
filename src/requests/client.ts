import axios from 'axios'
import { store } from '@/store'

const client = axios.create({ baseURL: 'http://localhost:5043' })

// Update client Authorization header based on state
store.subscribe(() => {
  const user = store.getState().auth.user
  client.defaults.headers['Authorization'] = user ? `Bearer ${user.token}` : ''
})

export default client
