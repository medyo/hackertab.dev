import create from 'zustand';
import { persist } from 'zustand/middleware'
import { BookmarkedPost } from "src/features/bookmarks"

type BookmarksState = {
  userBookmarks: BookmarkedPost[]
};

type BookmarksActions = {
  bookmarkPost: (post: BookmarkedPost) => void;
  unbookmarkPost: (post: BookmarkedPost) => void;
  initState: (state: BookmarksState) => void;
}


export const useBookmarks = create(persist<BookmarksState & BookmarksActions>((set) => ({
  userBookmarks: [],
  bookmarkPost: (post: BookmarkedPost) => set((state) => ({ userBookmarks: [post, ...state.userBookmarks] })),
  unbookmarkPost: (post: BookmarkedPost) => set((state) => ({ userBookmarks: state.userBookmarks.filter((bookmarkedPost) => bookmarkedPost.url !== post.url), })),
  initState: (newState: BookmarksState) => set(() => ({ userBookmarks: newState.userBookmarks }))
}), {
  name: 'bookmarks_storage'
}));
