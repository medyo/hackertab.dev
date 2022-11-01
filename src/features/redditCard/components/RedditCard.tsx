import CardComponent from '../../../components/CardComponent'
import { ListComponent } from 'src/components/List'
import { useGetArticles } from '../api/getArticles'
import { ArticleType, CardPropsType } from 'src/types'
import { ProductHuntPlaceholder } from 'src/components/placeholders'
import { useUserPreferences } from 'src/stores/preferences'
import { UseQueryResult } from '@tanstack/react-query'

import ArticleItem from './ArticleItem'

export function RedditCard(props: CardPropsType) {
  const { label, icon, withAds } = props
  const { userSelectedTags, listingMode } = useUserPreferences()

  const results = useGetArticles({ tags: userSelectedTags })

  const getIsLoading = () => results.some((result) => result.isLoading)

  const getData = () => {
    return results
      .reduce((acc: ArticleType[], curr) => {
        if (!curr.data) return acc
        return [...acc, ...curr.data]
      }, [])
      .sort((a, b) => b.reactions - a.reactions)
  }

  const renderItem = (item: ArticleType, index: number) => (
    <ArticleItem item={item} key={`re-${index}`} index={index} listingMode={listingMode}/>
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://reddit.com/"
      title={label}>
      <ListComponent
        items={getData()}
        isLoading={getIsLoading()}
        renderItem={renderItem}
        withAds={withAds}
        placeholder={<ProductHuntPlaceholder />}
      />
    </CardComponent>
  )
}
