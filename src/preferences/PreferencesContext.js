import React from 'react'

const PreferencesContext = React.createContext({
    userSelectedTags: [],
    dispatcher: null
});


export const PreferencesProvider = PreferencesContext.Provider

export default PreferencesContext


