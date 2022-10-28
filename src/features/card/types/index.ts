export type ArticleType = {
  id: string
  title: string
  url: string
  published_at: number
  tags: Array<string>
  reactions: number
  comments: number
  image_url: string
  original_url: string
  source: string
}

export type CardPropsType = {
    label: string
    icon: React.ReactNode
    withAds: boolean
    analyticsTag?: string
  }
  
  export type ArticleItemPropsType = {
    index: number
    item: ArticleType,
    listingMode: 'compact' | 'normal'
  }
  