import { useMemo } from 'react'
import { Card } from 'src/components/Elements'
import { ListConferenceComponent } from 'src/components/List/ListConferenceComponent'
import { useUserPreferences } from 'src/stores/preferences'
import { CardPropsType, Conference } from 'src/types'
import { useGetConferences } from '../../api/getConferences'
import { CardSettings } from '../CardSettings'
import ConferenceItem from './ConferenceItem'

export function ConferencesCard(props: CardPropsType) {
  const { meta } = props
  const cardSettings = useUserPreferences((state) => state.cardsSettings?.[meta.value])
  const { userSelectedTags } = useUserPreferences()

  const selectedTag = useMemo(() => {
    return userSelectedTags.find((lang) => lang.value === cardSettings?.language)
  }, [userSelectedTags, cardSettings])

  const { isLoading, data: results } = useGetConferences({
    tags: selectedTag ? [selectedTag.value] : userSelectedTags.map((tag) => tag.value),
  })

  const renderItem = (item: Conference, index: number) => (
    <ConferenceItem item={item} key={item.id} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card
      {...props}
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
