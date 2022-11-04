import CardComponent from 'src/components/CardComponent'
import { ListComponent } from 'src/components/List'
import { useGetConferences } from '../api/getConferences'
import { ConferenceType, CardPropsType } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { getCardTagsValue } from 'src/utils/DataEnhancement'
import ConferenceItem from './ConferenceItem'


export function ConferencesCard(props: CardPropsType) {
  const { label, icon, withAds } = props
  const { userSelectedTags, listingMode } = useUserPreferences()

  const results = useGetConferences({ tags: getCardTagsValue(userSelectedTags, 'devtoValues') })

  const isLoading = results.some((result) => result.isLoading)

  const getData = () => {
    return results
      .reduce((acc: ConferenceType[], curr) => {
        if (!curr.data) return acc
        return [...acc, ...curr.data]
      }, [])
      .sort((a, b) => a.start_date - b.start_date)
  }

  const renderItem = (item: ConferenceType, index: number) => (
    <ConferenceItem
      item={item}
      key={`cf-${index}`}
      index={index}
      listingMode={listingMode}
    />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://confs.tech/"
      title={label}>
      <ListComponent
        items={getData()}
        isLoading={isLoading}
        renderItem={renderItem}
        withAds={withAds}
      />
    </CardComponent>
  )
}
