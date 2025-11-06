import { Card } from 'src/components/Elements'
import { ListConferenceComponent } from 'src/components/List/ListConferenceComponent'
import { CardPropsType, Conference } from 'src/types'
import { useGetConferences } from '../../api/getConferences'
import { useSelectedTags } from '../../hooks/useSelectedTags'
import { CardHeader } from '../CardHeader'
import { CardSettings } from '../CardSettings'
import ConferenceItem from './ConferenceItem'

const GLOBAL_TAG = { label: 'Global', value: 'tech' }
export function ConferencesCard(props: CardPropsType) {
  const { meta } = props
  const { queryTags, selectedTag, cardSettings } = useSelectedTags({
    source: meta.value,
    fallbackTag: GLOBAL_TAG,
  })
  const { isLoading, data: results } = useGetConferences({
    tags: queryTags.map((tag) => tag.value),
  })

  const renderItem = (item: Conference, index: number) => (
    <ConferenceItem item={item} key={item.id} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card
      {...props}
      titleComponent={
        <CardHeader label={meta.label} fallbackTag={GLOBAL_TAG} selectedTag={selectedTag} />
      }
      settingsComponent={
        <CardSettings
          url={meta.link}
          id={meta.value}
          sortBy={cardSettings?.sortBy}
          language={cardSettings?.language}
          sortOptions={[
            {
              label: 'Upcoming',
              value: 'start_date',
            },
          ]}
        />
      }>
      <ListConferenceComponent
        sortBy={cardSettings?.sortBy as keyof Conference}
        items={results}
        isLoading={isLoading}
        renderItem={renderItem}
      />
    </Card>
  )
}
