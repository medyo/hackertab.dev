import React, { useEffect, useRef } from 'react'

type SearchBarProps = {
  iconStart?: React.ReactNode
  placeholder: string
  onSubmit?: (keyword: string) => void
  onChange?: (keyword: string) => void
}
export const SearchBar = ({ iconStart, placeholder, onChange, onSubmit }: SearchBarProps) => {
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
        className="searchBarInput"
        placeholder={placeholder}
      />
    </form>
  )
}
