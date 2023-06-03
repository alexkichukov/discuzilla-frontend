import client from './client'

export const getPost = async (id: string): Promise<Post> => {
  const response = await client.get(`/post/${id}`)
  return response.data
}

export const createPost = async (title: string, body: string): Promise<void> => {
  await client.post(`/post`, { title, body })
}

export const likePost = async (id: number): Promise<void> => {
  await client.get(`/post/${id}/like`)
}

export const getAllPosts = async (): Promise<SimplifiedPost[]> => {
  const response = await client.get('/posts')
  return response.data
}
