import React from 'react'

const ConfigurationContext = React.createContext({
    supportedTags: [{
        value: 'javascript', label: 'Javascript',
        githubValues: ['javascript'], confsValues: ['javascript'],
        stackoverflowValues: ['javascript'], devtoValues: ['javascript']
      }],
});


export const ConfigurationProvider = ConfigurationContext.Provider

export default ConfigurationContext
