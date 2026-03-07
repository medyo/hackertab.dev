import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX_READ_POST_IDS = 5000

type ReadPostsStore = {
  readPostIds: string[]
  markAsRead: (postId: string) => void
  markAsUnread: (postId: string) => void
}

export const useReadPosts = create<ReadPostsStore>()(
  persist(
    (set) => ({
      readPostIds: [],

      markAsRead: (postId) =>
        set((state) => {
          if (state.readPostIds.includes(postId)) return state

          const next =
            state.readPostIds.length >= MAX_READ_POST_IDS
              ? [...state.readPostIds.slice(1), postId]
              : [...state.readPostIds, postId]

          return { readPostIds: next }
        }),

      markAsUnread: (postId) =>
        set((state) => ({
          readPostIds: state.readPostIds.filter((id) => id !== postId),
        })),
    }),
    { name: 'read_post_ids' }
  )
)