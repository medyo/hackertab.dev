import { Card } from 'src/components/Elements/Card'
import { ListComponent } from 'src/components/List'
import { useGetArticles } from '../api/getArticles'
import { ArticleType, CardPropsType } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { getCardTagsValue } from 'src/utils/DataEnhancement'
import ArticleItem from './ArticleItem'

export function RedditCard({ withAds, meta }: CardPropsType) {
  const { userSelectedTags, listingMode } = useUserPreferences()

  const tags = getCardTagsValue(userSelectedTags, 'redditValues')

  const results = useGetArticles({ tags })

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
    <ArticleItem item={item} key={`re-${index}`} index={index} listingMode={listingMode} />
  )

  return (
    <Card card={meta}>
      <ListComponent
        items={getData()}
        isLoading={getIsLoading()}
        renderItem={renderItem}
        withAds={withAds}
      />
    </Card>
  )
}
