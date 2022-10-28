import React from 'react'
import { ArticleType } from 'src/features/card/types'

export type ListComponentPropsType = {
  items: ArticleType[], // <== TODO: Unified Article Type
  isLoading: boolean,
  renderItem: (item: ArticleType, index: number) => React.ReactNode,
  withAds: boolean,
  placeholder?: React.ReactNode,
  refresh?: boolean,
  error?: any
}
