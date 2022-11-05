import React from 'react'
import { BaseEntry } from 'src/types'

export type ListComponentPropsType<T extends BaseEntry> = {
  items: T[],
  isLoading: boolean,
  renderItem: (item: T, index: number) => React.ReactNode,
  withAds: boolean,
  placeholder?: React.ReactNode,
  refresh?: boolean,
  error?: any
}
