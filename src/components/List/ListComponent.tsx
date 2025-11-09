import React, { memo, ReactNode, useMemo } from 'react'
import { Placeholder } from 'src/components/placeholders'
import { MAX_ITEMS_PER_CARD } from 'src/config'

type PlaceholdersProps = {
  placeholder: ReactNode
}

const Placeholders = memo<PlaceholdersProps>(({ placeholder }) => {
  return (
    <>
      {[...Array(7)].map((_, i) => (
        <span key={i}>{placeholder}</span>
      ))}
    </>
  )
})

export type ListComponentPropsType<T extends unknown> = {
  items?: T[]
  sortBy?: keyof T
  sortFn?: (a: T, b: T) => number
  isLoading: boolean
  renderItem: (item: T, index: number) => React.ReactNode
  placeholder?: React.ReactNode
  header?: React.ReactNode
  refresh?: boolean
  error?: any
  limit?: number
}

export function ListComponent<T extends any>(props: ListComponentPropsType<T>) {
  const {
    items,
    sortBy,
    isLoading,
    error,
    sortFn,
    renderItem,
    header,
    placeholder = <Placeholder />,
    limit = MAX_ITEMS_PER_CARD,
  } = props

  const sortedData = useMemo(() => {
    if (!items || items.length == 0) return []
    if (!sortBy) return items

    const result = sortFn
      ? [...items].sort(sortFn)
      : [...items].sort((a, b) => {
          const aVal = a[sortBy]
          const bVal = b[sortBy]
          if (typeof aVal === 'number' && typeof bVal === 'number') return bVal - aVal
          if (typeof aVal === 'string' && typeof bVal === 'string') return bVal.localeCompare(aVal)
          return 0
        })

    return result
  }, [sortBy, sortFn, items])

  const enrichedItems = useMemo(() => {
    if (!sortedData || sortedData.length === 0) {
      return []
    }

    try {
      return sortedData.slice(0, limit).map((item, index) => {
        let content: ReactNode[] = [renderItem(item, index)]
        if (header && index === 0) {
          content.unshift(header)
        }

        return content
      })
    } catch (e) {
      return []
    }
  }, [sortedData, header, renderItem, limit])

  if (error) {
    return <p className="errorMsg">{error?.message || error}</p>
  }

  if (items && items.length == 0) {
    return (
      <p className="errorMsg">
        No items found, try adjusting your filter or choosing a different tag.
      </p>
    )
  }

  return <>{isLoading ? <Placeholders placeholder={placeholder} /> : enrichedItems}</>
}
