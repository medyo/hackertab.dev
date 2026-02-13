import React, { memo, ReactNode, useMemo } from 'react'
import { Placeholder } from 'src/components/placeholders'
import { MAX_ITEMS_PER_CARD } from 'src/config'
import { useReadPosts } from 'src/stores/readPosts'

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
  source?: string
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
    source,
  } = props

  const { readPosts } = useReadPosts()

  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return []
    if (!source) return items

    const readIds = readPosts[source] || []
    const readIdsSet = new Set(readIds)

    return items.filter((item: any) => !readIdsSet.has(item.id))
  }, [items, source, readPosts])

  const sortedData = useMemo(() => {
    if (!filteredItems || filteredItems.length == 0) return []
    if (!sortBy) return filteredItems

    const result = sortFn
      ? [...filteredItems].sort(sortFn)
      : [...filteredItems].sort((a, b) => {
          const aVal = a[sortBy]
          const bVal = b[sortBy]
          if (typeof aVal === 'number' && typeof bVal === 'number') return bVal - aVal
          if (typeof aVal === 'string' && typeof bVal === 'string') return bVal.localeCompare(aVal)
          return 0
        })

    return result
  }, [sortBy, sortFn, filteredItems])

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

  if (isLoading) {
    return <Placeholders placeholder={placeholder} />
  }
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

  if (items && items.length > 0 && filteredItems.length === 0) {
    return (
      <div className="centerMessageWrapper cardLoading">
        <div className="centerMessage errorMsg">
          <span className="centerMessageIcon">✨</span>
          <p><b>You're all caught up!</b></p>
          <p className="centerMessageSubtext">Check back later for fresh content.</p>
        </div>
      </div>
    )
  }

  return <>{enrichedItems}</>
}
