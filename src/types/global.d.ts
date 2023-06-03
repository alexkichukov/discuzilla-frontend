interface AuthUser extends User {
  token: string
}

interface User {
  id: number
  email: string
  username: string
  points: number
}

interface SimplifiedUser {
  id: number
  username: string
}

interface SimplifiedPost {
  id: number
  title: string
  body: string
  author: SimplifiedUser
  likeCount: number
  commentCount: number
  isLiked: boolean
  date: string
}

interface Post {
  id: number
  title: string
  body: string
  author: SimplifiedUser
  likeCount: number
  comments: Comment[]
  isLiked: boolean
  date: string
}

interface Comment {
  id: number
  body: string
  post: SimplifiedPost
  author: SimplifiedUser
  likeCount: number
  isLiked: boolean
}
