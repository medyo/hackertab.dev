import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useGetConferences } from '../api/getConferences'
import { Conference, CardPropsType } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { getCardTagsValue } from 'src/utils/DataEnhancement'
import ConferenceItem from './ConferenceItem'

export function ConferencesCard({ meta, withAds }: CardPropsType) {
  const { userSelectedTags, listingMode } = useUserPreferences()

  const results = useGetConferences({ tags: getCardTagsValue(userSelectedTags, 'devtoValues') })

  const isLoading = results.some((result) => result.isLoading)

  const getData = () => {
    return results
      .reduce((acc: Conference[], curr) => {
        if (!curr.data) return acc
        return [...acc, ...curr.data]
      }, [])
      .sort((a, b) => a.start_date - b.start_date)
  }

  const renderItem = (item: Conference, index: number) => (
    <ConferenceItem item={item} key={`cf-${index}`} index={index} listingMode={listingMode} />
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
