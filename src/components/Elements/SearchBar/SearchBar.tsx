import React, { useEffect, useRef } from 'react'
import { HiSparkles } from 'react-icons/hi'
import { AI_PROMPT_ENGINES } from 'src/config/SearchEngines'
import { trackSearchEngineUse } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'

export const SearchBar = () => {
  const { promptEngine, promptEngines } = useUserPreferences()
  const mergedEngines = [...AI_PROMPT_ENGINES, ...promptEngines]

  const keywordsInputRef = useRef<HTMLInputElement | null>(null)
  const usedSearchEngine =
    mergedEngines.find((engine) => engine.label.toLowerCase() === promptEngine.toLowerCase()) ||
    promptEngines[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      keyword: { value: string }
    }

    trackSearchEngineUse(usedSearchEngine.label)
    window.open(`${usedSearchEngine.url}${target.keyword.value}`, '_self')
  }

  useEffect(() => {
    keywordsInputRef.current?.focus()
  }, [])

  return (
    <form
      className="z-[1] inline-flex flex-1 items-center rounded-full bg-white py-2 sm:relative sm:mx-0 sm:my-auto sm:flex-grow-1 dark:bg-ht-100"
      onSubmit={handleSubmit}>
      {usedSearchEngine?.default === false ? (
        <HiSparkles className="mx-[16px] size-[22px] rounded-full" />
      ) : (
        <img
          className={'mx-[16px] size-[24px] rounded-full bg-white p-[2px]'}
          src={`/searchengine_logos/${usedSearchEngine.label.toLowerCase()}_logo.svg`}
        />
      )}
      <input
        ref={keywordsInputRef}
        type="text"
        name="keyword"
        className="box-border w-full text-ht-900 focus:outline-none"
        placeholder={`Ask ${usedSearchEngine.label}`}
      />
    </form>
  )
}
