import { clsx } from 'clsx'
import React, { useEffect, useRef } from 'react'

type SearchBarProps = {
  iconStart?: React.ReactNode
  placeholder: string
  inputClassName?: string
  onSubmit?: (keyword: string) => void
  onChange?: (keyword: string) => void
}
export const SearchBar = ({
  iconStart,
  placeholder,
  onChange,
  onSubmit,
  inputClassName,
}: SearchBarProps) => {
  const keywordsInputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      keyword: { value: string }
    }

    onSubmit?.(target.keyword.value)
  }

  useEffect(() => {
    keywordsInputRef.current?.focus()
  }, [])

  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      {iconStart}
      <input
        ref={keywordsInputRef}
        type="text"
        name="keyword"
        onChange={(e) => onChange?.(e.target.value)}
        className={clsx('searchBarInput shadow', inputClassName)}
        placeholder={placeholder}
      />
    </form>
  )
}
