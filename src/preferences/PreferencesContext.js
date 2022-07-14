import React from 'react'

const PreferencesContext = React.createContext({
    userSelectedTags: [],
    userSelectedLinks: [],
    dispatcher: null
});


export const PreferencesProvider = PreferencesContext.Provider

export default PreferencesContext


