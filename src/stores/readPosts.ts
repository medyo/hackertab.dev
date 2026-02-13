import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX_READ_POSTS_PER_SOURCE = 1000

type ReadPostsStore = {
  readPosts: Record<string, string[]>
  markAsRead: (source: string, postId: string) => void
}

export const useReadPosts = create<ReadPostsStore>()(
  persist(
    (set) => ({
      readPosts: {},

      markAsRead: (source, postId) =>
        set((state) => {
          const ids = state.readPosts[source] ?? []
          if (ids.includes(postId)) return state

          const next =
            ids.length >= MAX_READ_POSTS_PER_SOURCE
              ? [...ids.slice(1), postId]
              : [...ids, postId]

          return {
            readPosts: {
              ...state.readPosts,
              [source]: next,
            },
          }
        }),
    }),
    { name: 'read_posts_storage' }
  )
)