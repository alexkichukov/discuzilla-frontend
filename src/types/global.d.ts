interface AuthUser {
  id: number
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
  comments: PostComment[]
  isLiked: boolean
  date: string
}

interface PostComment {
  id: number
  body: string
  post: SimplifiedPost
  author: SimplifiedUser
  likeCount: number
  isLiked: boolean
  date: string
}

interface PostsPage {
  page: number
  totalPages: number
  posts: SimplifiedPost[]
}

interface CommentsPage {
  page: number
  totalPages: number
  comments: PostComment[]
}

interface LeaderboardPage {
  page: number
  totalPages: number
  users: User[]
}
