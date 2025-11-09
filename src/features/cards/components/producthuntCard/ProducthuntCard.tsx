import { useCallback } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { VscTriangleUp } from 'react-icons/vsc'
import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { ProductHuntPlaceholder } from 'src/components/placeholders'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, CardPropsType } from 'src/types'
import { useShallow } from 'zustand/shallow'
import { useGeProductHuntProducts } from '../../api/getProductHuntProducts'
import { useLazyListLoad } from '../../hooks/useLazyListLoad'
import { MemoizedCardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

export function ProductHuntCard(props: CardPropsType) {
  const { meta } = props
  const { ref, isVisible } = useLazyListLoad()
  const sortBy = useUserPreferences(
    useShallow((state) => state.cardsSettings?.[meta.value]?.sortBy)
  )

  const {
    data: products = [],
    isLoading,
    error,
  } = useGeProductHuntProducts({
    date: new Date().toISOString().split('T')[0],
    config: {
      enabled: isVisible,
    },
  })

  const renderItem = useCallback(
    (item: Article) => <ArticleItem item={item} key={item.id} analyticsTag={meta.analyticsTag} />,
    [meta.analyticsTag]
  )

  return (
    <Card
      ref={ref}
      {...props}
      settingsComponent={
        <MemoizedCardSettings
          url={meta.link}
          id={meta.value}
          showLanguageFilter={false}
          sortBy={sortBy}
          sortOptions={[
            {
              label: 'Upvotes',
              value: 'points_count',
              icon: <VscTriangleUp />,
            },
            {
              label: 'Comments',
              value: 'comments_count',
              icon: <BiCommentDetail />,
            },
          ]}
        />
      }>
      <ListComponent
        items={products}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
        placeholder={<ProductHuntPlaceholder />}
      />
    </Card>
  )
}
