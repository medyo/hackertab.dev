import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useGetConferences } from '../../api/getConferences'
import { Conference, CardPropsType } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { getCardTagsValue } from 'src/utils/DataEnhancement'
import ConferenceItem from './ConferenceItem'
import { filterUniqueEntries } from 'src/utils/DataEnhancement'

export function ConferencesCard({ meta, withAds }: CardPropsType) {
  const { userSelectedTags } = useUserPreferences()

  const results = useGetConferences({ tags: getCardTagsValue(userSelectedTags, 'confsValues') })

  const isLoading = results.some((result) => result.isLoading)

  const getData = () => {
    return filterUniqueEntries(
      results
        .reduce((acc: Conference[], curr) => {
          if (!curr.data) return acc
          return [...acc, ...curr.data]
        }, [])
        .sort((a, b) => a.start_date - b.start_date)
    )
  }

  const renderItem = (item: Conference, index: number) => (
    <ConferenceItem
      item={item}
      key={`cf-${index}`}
      index={index}
      analyticsTag={meta.analyticsTag}
    />
  )

  return (
    <Card card={meta}>
      <ListComponent
        items={getData()}
        isLoading={isLoading}
        renderItem={renderItem}
        withAds={withAds}
      />
    </Card>
  )
}
