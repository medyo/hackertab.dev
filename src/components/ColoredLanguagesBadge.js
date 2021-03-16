import React from 'react';

function ColoredLanguageItem({ index, language }) {
  return (<span key={index} className={"rowItem rowLanguage gh-language-" + language.toLowerCase()}>{language}</span>)
}
function ColoredLanguagesBadge({ languages }) {
  return languages ?
    languages.map((language, index) => <ColoredLanguageItem language={language} index={index} />) :
    null
}

export default ColoredLanguagesBadge