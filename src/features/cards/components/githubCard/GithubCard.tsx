import { MenuDivider, MenuItem } from '@szhsin/react-menu'
import { useMemo } from 'react'
import { VscRepoForked, VscStarFull } from 'react-icons/vsc'
import { Card, FloatingFilter } from 'src/components/Elements'
import { ListRepoComponent } from 'src/components/List/ListRepoComponent'
import { dateRanges } from 'src/config'
import { useUserPreferences } from 'src/stores/preferences'
import { CardPropsType, Repository } from 'src/types'
import { useGetGithubRepos } from '../../api/getGithubRepos'
import { CardSettings } from '../CardSettings'
import RepoItem from './RepoItem'

const GLOBAL_TAG = { label: 'Global', value: 'global' }

export function GithubCard(props: CardPropsType) {
  const { meta } = props
  const userSelectedTags = useUserPreferences((state) => state.userSelectedTags)
  const setCardSettings = useUserPreferences((state) => state.setCardSettings)
  const cardSettings = useUserPreferences((state) => state.cardsSettings?.[meta.value])

  const selectedTag = useMemo(
    () => userSelectedTags.find((lang) => lang.value === cardSettings?.language) || GLOBAL_TAG,
    [userSelectedTags, cardSettings]
  )

  const selectedDateRange = useMemo(
    () => dateRanges.find((date) => date.value === cardSettings?.dateRange) || dateRanges[0],
    [cardSettings]
  )

  const { data, error, isLoading } = useGetGithubRepos({
    tag: selectedTag.value,
    dateRange: selectedDateRange.value,
    config: {
      enabled: !!selectedTag?.value,
    },
  })

  const renderItem = (item: Repository, index: number) => (
    <RepoItem
      item={item}
      key={`rp-${index}`}
      index={index}
      selectedTag={selectedTag}
      analyticsTag={meta.analyticsTag}
    />
  )

  const HeaderTitle = () => {
    return (
      <div>
        Github <span className="blockHeaderHighlight">{selectedTag.label}</span>{' '}
        <span className="blockHeaderHighlight">{selectedDateRange.label.toLowerCase()}</span>
      </div>
    )
  }

  return (
    <Card
      fullBlock={true}
      titleComponent={<HeaderTitle />}
      settingsComponent={
        <CardSettings
          url={meta.link}
          id={meta.value}
          globalTag={GLOBAL_TAG}
          sortBy={cardSettings?.sortBy}
          language={cardSettings?.language || GLOBAL_TAG.value}
          customStartMenuItems={
            <>
              {dateRanges.map((date) => (
                <MenuItem
                  className={`menuItem`}
                  value={date.value}
                  disabled={selectedDateRange.value === date.value}
                  onClick={() => {
                    setCardSettings(meta.value, { ...cardSettings, dateRange: date.value })
                  }}>
                  {date.label}
                </MenuItem>
              ))}
              <MenuDivider />
            </>
          }
          sortOptions={[
            {
              label: 'Stars',
              value: 'stars_count',
              icon: <VscStarFull />,
            },
            {
              label: 'Forks',
              value: 'forks_count',
              icon: <VscRepoForked />,
            },
          ]}
        />
      }
      {...props}>
      <FloatingFilter card={meta} filters={['datesRange', 'language']} />
      <ListRepoComponent
        sortBy={cardSettings?.sortBy as keyof Repository}
        items={data}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
      />
    </Card>
  )
}
