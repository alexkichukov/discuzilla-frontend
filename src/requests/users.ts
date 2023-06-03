import client from './client'

export const getUser = async (username: string): Promise<User> => {
  const response = await client.get(`/user/${username}`)
  return response.data
}
