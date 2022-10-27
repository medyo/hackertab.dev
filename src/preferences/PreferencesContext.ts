import React from 'react'

const PreferencesContext = React.createContext({
    userSelectedTags: [],
    dispatcher: null,
    changelogMeta: {
        shown: false,
        version: "",
    }
});


export const PreferencesProvider = PreferencesContext.Provider

export default PreferencesContext


