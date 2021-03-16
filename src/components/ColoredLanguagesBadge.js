import React from 'react';

function ColoredLanguageItem({ language }) {
  return (<span className={"rowItem rowLanguage gh-language-" + language.toLowerCase()}>{language}</span>)
}
function ColoredLanguagesBadge({ languages }) {

  return languages ?
    languages.map((language, index) => <ColoredLanguageItem language={language} key={`cl-${language}-${index}`} />) :
    null
}

export default ColoredLanguagesBadge