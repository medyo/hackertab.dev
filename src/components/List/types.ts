import React from 'react'
import { ArticleType, ConferenceType } from 'src/types'

export type ListComponentPropsType = {
  items: ArticleType[] | ConferenceType[]
  isLoading: boolean,
  renderItem: (item: any, index: number) => React.ReactNode,
  withAds: boolean,
  placeholder?: React.ReactNode,
  refresh?: boolean,
  error?: any
}
