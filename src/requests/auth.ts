import client from './client'

export const login = async (username: string, password: string): Promise<AuthUser> => {
  const response = await client.post(`/login`, { username, password })
  return response.data
}

export const register = async (
  username: string,
  password: string,
  email: string
): Promise<AuthUser> => {
  const response = await client.post(`/register`, { username, password, email })
  return response.data
}
