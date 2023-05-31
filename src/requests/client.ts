import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:5043' })

export default client
