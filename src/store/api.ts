import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './index'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5043/',
    prepareHeaders: (headers, { getState }) => {
      const user = (getState() as RootState).auth.user
      if (user) headers.set('authorization', `Bearer ${user.token}`)
      return headers
    }
  }),
  tagTypes: ['Post', 'Posts', 'Comments', 'User'],
  endpoints: (builder) => ({
    // Get a user
    getUser: builder.query<User, string | number>({
      query: (id) => `user/${id}`,
      providesTags: ['User']
    }),

    // Update authenticated user
    updateUser: builder.mutation<void, { username: string; email: string }>({
      query: ({ username, email }) => ({
        url: `user`,
        method: 'PUT',
        body: { username, email }
      }),
      invalidatesTags: ['Post', 'Posts', 'Comments', 'User']
    }),

    // Get leaderboard
    getLeaderboard: builder.query<LeaderboardPage, { page: number }>({
      query: ({ page }) => `leaderboard?page=${page}`,
      providesTags: ['User']
    }),

    // Get all posts
    getPosts: builder.query<PostsPage, { page: number; author?: string | number }>({
      query: ({ page, author }) => `posts?page=${page}${author ? `&author=${author}` : ''}`,
      providesTags: ['Posts']
    }),

    // Get a post
    getPost: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
      providesTags: ['Post']
    }),

    // Like a post
    likePost: builder.mutation<void, string | number>({
      query: (id) => ({ url: `posts/${id}/like`, method: 'PUT' }),
      invalidatesTags: ['Post', 'Posts', 'User']
    }),

    // Add a post
    addPost: builder.mutation<Post, { title: string; body: string }>({
      query: ({ title, body }) => ({
        url: 'posts',
        method: 'POST',
        body: { title, body }
      }),
      invalidatesTags: ['Post', 'Posts', 'User']
    }),

    // Delete a post
    deletePost: builder.mutation<void, string | number>({
      query: (id) => ({ url: `posts/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Posts']
    }),

    // Update a post
    updatePost: builder.mutation<Post, { id: string | number; title: string; body: string }>({
      query: ({ id, title, body }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: { title, body }
      }),
      invalidatesTags: ['Post', 'Posts']
    }),

    // Get all comments
    getComments: builder.query<CommentsPage, { page?: number; author: string | number }>({
      query: ({ page, author }) => `comments?page=${page}&author=${author}`,
      providesTags: ['Comments']
    }),

    // Add a comment
    addComment: builder.mutation<PostComment, { postID: string | number; comment: string }>({
      query: ({ postID, comment }) => ({
        url: `comments?post=${postID}`,
        method: 'POST',
        body: { body: comment }
      }),
      invalidatesTags: ['Post', 'Posts', 'User']
    }),

    // Like a comment
    likeComment: builder.mutation<void, string | number>({
      query: (id) => ({ url: `comments/${id}/like`, method: 'PUT' }),
      invalidatesTags: ['Post', 'Comments', 'User']
    }),

    // Delete a comment
    deleteComment: builder.mutation<void, string | number>({
      query: (id) => ({ url: `comments/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Post', 'Posts']
    }),

    // Update a comment
    updateComment: builder.mutation<PostComment, { id: string | number; comment: string }>({
      query: ({ id, comment }) => ({
        url: `comments/${id}`,
        method: 'PUT',
        body: { body: comment }
      }),
      invalidatesTags: ['Post']
    })
  })
})

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useGetLeaderboardQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useLikePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useLikeCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation
} = apiSlice
