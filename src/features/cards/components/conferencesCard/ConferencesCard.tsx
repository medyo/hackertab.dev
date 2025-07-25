import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useUserPreferences } from 'src/stores/preferences'
import { CardPropsType, Conference } from 'src/types'
import { filterUniqueEntries, getCardTagsValue } from 'src/utils/DataEnhancement'
import { useGetConferences } from '../../api/getConferences'
import ConferenceItem from './ConferenceItem'

export function ConferencesCard(props: CardPropsType) {
  const { meta } = props
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
    <Card {...props}>
      <ListComponent items={getData()} isLoading={isLoading} renderItem={renderItem} />
    </Card>
  )
}
