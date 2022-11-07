export const ColoredLanguageItem = ({ language }: { language: string }) => {
  return (
    <span className={`rowItem rowLanguage gh-language-${language.toLowerCase()}`}>{language}</span>
  )
}
export const ColoredLanguagesBadge = ({ languages }: { languages: string[] }) => {
  return (
    <>
      {languages &&
        languages.map(
          (language, index) =>
            language && <ColoredLanguageItem language={language} key={`cl-${language}-${index}`} />
        )}
    </>
  )
}
