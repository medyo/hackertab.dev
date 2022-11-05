import React from 'react'
import { ArticleType, ConferenceType, RepoType } from 'src/types'

export type ListComponentPropsType = {
  items: ArticleType[] | ConferenceType[] | RepoType[],
  isLoading: boolean,
  renderItem: (item: any, index: number) => React.ReactNode,
  withAds: boolean,
  placeholder?: React.ReactNode,
  refresh?: boolean,
  error?: any
}
