import arrayMove from 'array-move'
import { Occupation } from 'src/features/onboarding/types'
import { Tag } from 'src/features/remoteConfig'
import { enhanceTags } from 'src/utils/DataEnhancement'
import { create } from 'zustand'
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware'
import {
  CardSettingsType,
  DNDDuration,
  ListingMode,
  SearchEngineType,
  SelectedCard,
  SupportedCardType,
  Theme,
  ThemePreferences
} from '../types'

export type UserPreferencesState = {
  userSelectedTags: Tag[]
  theme: Theme
  themePreferences: ThemePreferences
  openLinksNewTab: boolean
  onboardingCompleted: boolean
  onboardingResult: Omit<Occupation, 'icon'> | null
  listingMode: ListingMode
  searchEngine: string
  searchEngines: SearchEngineType[]
  maxVisibleCards: number
  cards: SelectedCard[]
  cardsSettings: Record<string, CardSettingsType>
  firstSeenDate: number
  userCustomCards: SupportedCardType[]
  DNDDuration: DNDDuration
}

type UserPreferencesStoreActions = {
  initState: (newState: UserPreferencesState) => void
  setTheme: (theme: Theme) => void
  setSearchEngine: (theme: string) => void
  setOpenLinksNewTab: (openLinksNewTab: boolean) => void
  setListingMode: (listingMode: ListingMode) => void
  setCards: (selectedCards: SelectedCard[]) => void
  setTags: (selectedTags: Tag[]) => void
  setMaxVisibleCards: (maxVisibleCards: number) => void
  setCardSettings: (card: string, settings: CardSettingsType) => void
  markOnboardingAsCompleted: (occupation: Omit<Occupation, 'icon'> | null) => void
  setUserCustomCards: (cards: SupportedCardType[]) => void
  updateCardOrder: (prevIndex: number, newIndex: number) => void
  setDNDDuration: (value: DNDDuration) => void
  isDNDModeActive: () => boolean
  addSearchEngine: (searchEngine: SearchEngineType) => void
  removeSearchEngine: (searchEngineUrl: string) => void
  setThemePreferences: (prefs: Partial<ThemePreferences>) => void
}

const defaultStorage: StateStorage = {
  getItem: (name: string) => {
    const item = window.localStorage.getItem(name)

    if (item) {
      let {
        version,
        state,
      }: {
        version: number
        state: UserPreferencesState
      } = JSON.parse(item)

      const newState = {
        ...state,
        userSelectedTags: enhanceTags(state.userSelectedTags as unknown as string[]),
      }
      return JSON.stringify({ state: newState, version })
    }

    return null
  },
  setItem: (name: string, value: string) => {
    try {
      let {
        state,
        version,
      }: {
        version: number
        state: UserPreferencesState
      } = JSON.parse(value)

      const newState = {
        ...state,
        userSelectedTags: state.userSelectedTags.map((tag) => tag.value),
      }

      const newValue = JSON.stringify({ state: newState, version })
      window.localStorage.setItem(name, newValue)
    } catch (e) {
      console.log('Prefs, SetItem', e)
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
          githubValues: ['javascript'],
          confsValues: ['javascript'],
          devtoValues: ['javascript'],
          hashnodeValues: ['javascript'],
          mediumValues: ['javascript'],
          redditValues: ['javascript'],
          freecodecampValues: ['javascript'],
        },
      ],
      cardsSettings: {},
      maxVisibleCards: 4,
      theme: 'dark',
      themePreferences: {
        mode: 'manual',
        autoStartHour: 19, // 7 PM
        autoEndHour: 6, // 6 AM
      },
      onboardingCompleted: false,
      onboardingResult: null,
      searchEngine: 'chatgpt',
      searchEngines: [
        {
          label: 'Google',
          url: 'https://google.com/search?q=',
        },
        {
          label: 'DuckDuckGo',
          url: 'https://duckduckgo.com?q=',
        },
        {
          label: 'Bing',
          url: 'https://bing.com/search?q=',
        },
        {
          label: 'Yahoo',
          url: 'https://search.yahoo.com/search?p=',
        },
        {
          label: 'Baidu',
          url: 'https://baidu.com/s?wd=',
        },
        {
          label: 'Yandex',
          url: 'https://yandex.ru/search/?text=',
        },
        {
          label: 'Startpage',
          url: 'https://www.startpage.com/sp/search?query=',
        },
        {
          label: 'Phind',
          url: 'https://phind.com/search?q=',
        },
        {
          label: 'Kagi',
          url: 'https://kagi.com/search?q=',
        },
        {
          label: 'Chatgpt',
          url: 'https://chatgpt.com/?q=',
        },
      ],
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
      setSearchEngine: (searchEngine: string) => set({ searchEngine: searchEngine }),
      setListingMode: (listingMode: ListingMode) => set({ listingMode: listingMode }),
      setTheme: (theme: Theme) => set({ theme }),
      setThemePreferences: (prefs: Partial<ThemePreferences>) =>
        set((state) => ({
          themePreferences: { ...state.themePreferences, ...prefs },
        })),
      setOpenLinksNewTab: (openLinksNewTab: boolean) => set({ openLinksNewTab: openLinksNewTab }),
      setCards: (selectedCards: SelectedCard[]) => set({ cards: selectedCards }),
      setTags: (selectedTags: Tag[]) => set({ userSelectedTags: selectedTags }),
      setMaxVisibleCards: (maxVisibleCards: number) => set({ maxVisibleCards: maxVisibleCards }),
      initState: (newState: UserPreferencesState) =>
        set(() => {
          return { ...newState }
        }),
      setCardSettings: (card: string, settings: CardSettingsType) =>
        set((state) => ({
          cardsSettings: {
            ...state.cardsSettings,
            [card]: { ...state.cardsSettings[card], ...settings },
          },
        })),
      markOnboardingAsCompleted: (occupation: Omit<Occupation, 'icon'> | null) =>
        set(() => ({
          onboardingCompleted: true,
          onboardingResult: occupation,
        })),
      setUserCustomCards: (cards: SupportedCardType[]) => set({ userCustomCards: cards }),
      updateCardOrder: (prevIndex: number, newIndex: number) =>
        set((state) => {
          const newState = arrayMove(state.cards, prevIndex, newIndex).map((card, index) => {
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
      addSearchEngine: (searchEngine: SearchEngineType) =>
        set((state) => {
          return { searchEngines: [...state.searchEngines, searchEngine] }
        }),
      removeSearchEngine: (searchEngineUrl: string) =>
        set((state) => {
          return {
            searchEngines: state.searchEngines.filter((se) => se.url !== searchEngineUrl),
          }
        }),
    }),
    {
      name: 'preferences_storage',
      storage: createJSONStorage(() => defaultStorage),
    }
  )
)
