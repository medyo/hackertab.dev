import { useCallback } from 'react'
import { Card } from 'src/components/Elements'
import { ListConferenceComponent } from 'src/components/List/ListConferenceComponent'
import { CardPropsType, Conference } from 'src/types'
import { useGetConferences } from '../../api/getConferences'
import { useLazyListLoad } from '../../hooks/useLazyListLoad'
import { useSelectedTags } from '../../hooks/useSelectedTags'
import { MemoizedCardHeader } from '../CardHeader'
import { MemoizedCardSettings } from '../CardSettings'
import ConferenceItem from './ConferenceItem'

const GLOBAL_TAG = { label: 'Global', value: 'general' }
export function ConferencesCard(props: CardPropsType) {
  const { meta } = props
  const { ref, isVisible } = useLazyListLoad()
  const {
    queryTags,
    selectedTag,
    cardSettings: { sortBy, language } = {},
  } = useSelectedTags({
    source: meta.value,
    fallbackTag: GLOBAL_TAG,
  })
  const {
    isLoading,
    error,
    data: results,
  } = useGetConferences({
    tags: queryTags,
    config: {
      enabled: isVisible,
    },
  })

  const renderItem = useCallback(
    (item: Conference) => (
      <ConferenceItem item={item} key={item.id} analyticsTag={meta.analyticsTag} />
    ),
    [meta.analyticsTag]
  )

  return (
    <Card
      ref={ref}
      {...props}
      titleComponent={
        <MemoizedCardHeader label={meta.label} fallbackTag={GLOBAL_TAG} selectedTag={selectedTag} />
      }
      settingsComponent={
        <MemoizedCardSettings
          url={meta.link}
          id={meta.value}
          sortBy={sortBy}
          language={language}
          sortOptions={[
            {
              label: 'Upcoming',
              value: 'start_date',
            },
          ]}
        />
      }>
      <ListConferenceComponent
        sortBy={sortBy as keyof Conference}
        items={results}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
        source={meta.value}
      />
    </Card>
  )
}
