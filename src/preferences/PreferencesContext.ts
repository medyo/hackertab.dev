import React from 'react'

type PreferencesContextProps = {
  userSelectedTags: any[],
  cards: any[],
  openLinksNewTab: boolean,
  listingMode: string,
  searchEngine: string,
  theme: string,
  dispatcher: (value: any) => void;
  changelogMeta: {
    shown: boolean,
    version: string
  }
}

const PreferencesContext = React.createContext<PreferencesContextProps>({
  userSelectedTags: [],
  listingMode: '',
  theme: '',
  searchEngine: '',
  cards: [],
  dispatcher: (value: any) => {
    console.log("Not implemented")
  },
  changelogMeta: {
      shown: false,
      version: "",
  },
  openLinksNewTab: false,
});


export const PreferencesProvider = PreferencesContext.Provider

export default PreferencesContext


