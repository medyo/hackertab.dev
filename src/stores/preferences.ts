import { Tag, useRemoteConfigStore } from 'src/features/remoteConfig'
import { enhanceTags } from 'src/utils/DataEnhancement'
import { create } from 'zustand'
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware'
import {
  CardSettingsType,
  DNDDuration,
  Layout,
  ListingMode,
  SearchEngineType,
  SelectedCard,
  SupportedCardType,
  Theme,
} from '../types'

export type UserPreferencesState = {
  userSelectedTags: Tag[]
  layout: Layout
  theme: Theme
  openLinksNewTab: boolean
  onboardingCompleted: boolean
  occupation: string | null
  listingMode: ListingMode
  promptEngine: string
  promptEngines: SearchEngineType[]
  maxVisibleCards: number
  cards: SelectedCard[]
  cardsSettings: Record<string, CardSettingsType>
  firstSeenDate: number
  userCustomCards: SupportedCardType[]
  advStatus: boolean
  DNDDuration: DNDDuration
}

type UserPreferencesStoreActions = {
  setLayout: (layout: Layout) => void
  setTheme: (theme: Theme) => void
  setPromptEngine: (engine: string) => void
  setOpenLinksNewTab: (openLinksNewTab: boolean) => void
  setListingMode: (listingMode: ListingMode) => void
  setCards: (selectedCards: SelectedCard[]) => void
  removeCard: (cardName: string) => void
  setTags: (selectedTags: Tag[]) => void
  followTag: (tag: Tag) => void
  unfollowTag: (tag: Tag) => void
  setMaxVisibleCards: (maxVisibleCards: number) => void
  setCardSettings: (card: string, settings: CardSettingsType) => void
  setOccupation: (occupation: string | null) => void
  markOnboardingAsCompleted: () => void
  setUserCustomCards: (cards: SupportedCardType[]) => void
  updateCardOrder: (prevIndex: number, newIndex: number) => void
  setDNDDuration: (value: DNDDuration) => void
  isDNDModeActive: () => boolean
  addSearchEngine: (searchEngine: SearchEngineType) => void
  removeSearchEngine: (searchEngineUrl: string) => void
  setAdvStatus: (status: boolean) => void
}

const defaultStorage: StateStorage = {
  getItem: (name: string) => {
    const item = window.localStorage.getItem(name)
    if (!item) {
      return null
    }

    try {
      let {
        version,
        state,
      }: {
        version: number
        state: UserPreferencesState
      } = JSON.parse(item)

      const newState = {
        ...state,
      }
      if (version == 0) {
        const MAP_OLD_TAGS: Record<string, string> = {
          'artificial-intelligence': 'artificial intelligence',
          'machine-learning': 'machine learning',
          c: 'clang',
          cpp: 'c++',
          csharp: 'c#',
          'data-science': 'data science',
          go: 'golang',
          'objective-c': 'objectivec',
        }

        const stateTags = state.userSelectedTags as unknown as string[]
        const newTags = stateTags.map((tag) => {
          if (MAP_OLD_TAGS[tag]) {
            return MAP_OLD_TAGS[tag]
          }
          return tag
        })
        newState.userSelectedTags = enhanceTags(useRemoteConfigStore.getState(), newTags)
      }

      return JSON.stringify({ state: newState, version })
    } catch (e) {
      return null
    }
  },
  setItem: (name: string, value: string) => {
    try {
      window.localStorage.setItem(name, value)
    } catch (e) {
      window.localStorage.setItem(name, '')
    }
  },
  removeItem: (name: string) => {
    window.localStorage.removeItem(name)
  },
}

export const useUserPreferences = create(
  persist<UserPreferencesState & UserPreferencesStoreActions>(
    (set, get) => ({
      userSelectedTags: [
        {
          value: 'javascript',
          label: 'Javascript',
        },
      ],
      occupation: null,
      layout: 'cards',
      cardsSettings: {},
      maxVisibleCards: 4,
      theme: 'dark',
      onboardingCompleted: false,
      promptEngine: 'chatgpt',
      promptEngines: [],
      listingMode: 'normal',
      openLinksNewTab: true,
      firstSeenDate: Date.now(),
      cards: [
        { id: 0, name: 'github', type: 'supported' },
        { id: 1, name: 'hackernews', type: 'supported' },
        { id: 2, name: 'ai', type: 'supported' },
        { id: 3, name: 'producthunt', type: 'supported' },
      ],
      userCustomCards: [],
      DNDDuration: 'never',
      advStatus: false,
      setLayout: (layout) => set({ layout }),
      setPromptEngine: (promptEngine: string) => set({ promptEngine }),
      setListingMode: (listingMode: ListingMode) => set({ listingMode }),
      setTheme: (theme: Theme) => set({ theme }),
      setOpenLinksNewTab: (openLinksNewTab: boolean) => set({ openLinksNewTab }),
      setCards: (selectedCards: SelectedCard[]) => set({ cards: selectedCards }),
      setTags: (selectedTags: Tag[]) => set({ userSelectedTags: selectedTags }),
      setMaxVisibleCards: (maxVisibleCards: number) => set({ maxVisibleCards }),
      setCardSettings: (card: string, settings: CardSettingsType) =>
        set((state) => ({
          cardsSettings: {
            ...state.cardsSettings,
            [card]: { ...state.cardsSettings[card], ...settings },
          },
        })),
      markOnboardingAsCompleted: () =>
        set(() => ({
          onboardingCompleted: true,
        })),
      setOccupation: (occupation: string | null) =>
        set(() => ({
          occupation: occupation,
        })),
      setUserCustomCards: (cards: SupportedCardType[]) => set({ userCustomCards: cards }),
      updateCardOrder: (prevIndex: number, newIndex: number) =>
        set((state) => {
          const updated = [...state.cards]
          const [movedItem] = updated.splice(prevIndex, 1)
          updated.splice(newIndex, 0, movedItem)

          const newState = updated.map((card, index) => {
            return {
              ...card,
              id: index,
            }
          })

          return { cards: newState }
        }),
      setDNDDuration: (value: DNDDuration) => set({ DNDDuration: value }),
      isDNDModeActive: () => {
        const duration = get().DNDDuration
        if (duration === 'always') {
          return true
        } else if (typeof duration === 'object') {
          const dndValue = duration as {
            value: number
            countdown: number
          }
          return Boolean(dndValue.value && dndValue.countdown - new Date().getTime() > 0)
        } else {
          return false
        }
      },
      addSearchEngine: (engine: SearchEngineType) =>
        set((state) => {
          return { promptEngines: [...state.promptEngines, engine] }
        }),
      removeSearchEngine: (engine: string) =>
        set((state) => {
          return {
            promptEngines: state.promptEngines.filter((se) => se.url !== engine),
          }
        }),
      setAdvStatus: (status) => set({ advStatus: status }),
      removeCard: (cardName: string) =>
        set((state) => {
          return {
            cards: state.cards.filter((card) => card.name !== cardName),
          }
        }),
      followTag: (tag: Tag) =>
        set((state) => {
          const exists = state.userSelectedTags.find((t) => t.value === tag.value)
          if (exists) {
            return state
          }
          return {
            userSelectedTags: [...state.userSelectedTags, tag],
          }
        }),
      unfollowTag: (tag: Tag) =>
        set((state) => {
          return {
            userSelectedTags: state.userSelectedTags.filter((t) => t.value !== tag.value),
          }
        }),
    }),
    {
      name: 'preferences_storage',
      version: 1,
      storage: createJSONStorage(() => defaultStorage),
      migrate: (persistedState) => {
        const state = persistedState as unknown as UserPreferencesState &
          UserPreferencesStoreActions
        return state
      },
    }
  )
)
