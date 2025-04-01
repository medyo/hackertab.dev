import { create } from 'zustand'

import { BookmarkedPost } from 'src/features/bookmarks'
import { persist } from 'zustand/middleware'

type BookmarksState = {
  userBookmarks: BookmarkedPost[]
}

type BookmarksActions = {
  bookmarkPost: (post: BookmarkedPost) => void
  unbookmarkPost: (post: BookmarkedPost) => void
  initState: (state: BookmarksState) => void
  clear: () => void
}

export const useBookmarks = create(
  persist<BookmarksState & BookmarksActions>(
    (set) => ({
      userBookmarks: [],
      bookmarkPost: (post: BookmarkedPost) =>
        set((state) => ({ userBookmarks: [post, ...state.userBookmarks] })),
      unbookmarkPost: (post: BookmarkedPost) =>
        set((state) => ({
          userBookmarks: state.userBookmarks.filter(
            (bookmarkedPost) => bookmarkedPost.url !== post.url
          ),
        })),
      initState: (newState: BookmarksState) =>
        set(() => ({ userBookmarks: newState.userBookmarks })),
      clear: () => set({ userBookmarks: [] }),
    }),
    {
      name: 'bookmarks_storage',
    }
  )
)
