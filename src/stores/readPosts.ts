import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX_READ_POST_IDS = 5000

type ReadPostsStore = {
  readPostIds: string[]
  readPostIdSet: Set<string>
  markAsRead: (postId: string) => void
  markAsUnread: (postId: string) => void
}

export const useReadPosts = create<ReadPostsStore>()(
  persist(
    (set) => ({
      readPostIds: [],
      readPostIdSet: new Set(),
      markAsRead: (postId) =>
        set((state) => {
          if (state.readPostIds.includes(postId)) return state

          const next =
            state.readPostIds.length >= MAX_READ_POST_IDS
              ? [...state.readPostIds.slice(1), postId]
              : [...state.readPostIds, postId]

          const nextSet = new Set(state.readPostIdSet)
          nextSet.add(postId)

          return { readPostIds: next, readPostIdSet: nextSet }
        }),

      markAsUnread: (postId) =>
        set((state) => {
          if (!state.readPostIds.includes(postId)) return state

          const next = state.readPostIds.filter((id) => id !== postId)
          const nextSet = new Set(state.readPostIdSet)
          nextSet.delete(postId)

          return { readPostIds: next, readPostIdSet: nextSet }
        }),
    }),
    {
      name: 'read_post_ids_storage',
      partialize: (state) => ({ readPostIds: state.readPostIds }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.readPostIdSet = new Set(state.readPostIds)
        }
      },
    }
  )
)
