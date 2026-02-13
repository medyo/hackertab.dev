import { MenuDivider, MenuItem } from '@szhsin/react-menu'
import { useCallback, useMemo } from 'react'
import { VscRepoForked, VscStarFull } from 'react-icons/vsc'
import { Card } from 'src/components/Elements'
import { ListRepoComponent } from 'src/components/List/ListRepoComponent'
import { dateRanges } from 'src/config'
import { useUserPreferences } from 'src/stores/preferences'
import { CardPropsType, Repository } from 'src/types'
import { useGetGithubRepos } from '../../api/getGithubRepos'
import { useLazyListLoad } from '../../hooks/useLazyListLoad'
import { useSelectedTags } from '../../hooks/useSelectedTags'
import { MemoizedCardSettings } from '../CardSettings'
import RepoItem from './RepoItem'

const GLOBAL_TAG = { label: 'Global', value: 'global' }

export function GithubCard(props: CardPropsType) {
  const { meta } = props

  const { ref, isVisible } = useLazyListLoad()
  const setCardSettings = useUserPreferences((state) => state.setCardSettings)
  const { queryTags, selectedTag, cardSettings } = useSelectedTags({
    source: meta.value,
    fallbackTag: GLOBAL_TAG,
  })
  const { dateRange, language, sortBy } = cardSettings ?? {}

  const selectedDateRange = useMemo(
    () => dateRanges.find((date) => date.value === dateRange) || dateRanges[0],
    [dateRange]
  )

  const { data, error, isLoading } = useGetGithubRepos({
    tags: queryTags,
    dateRange: selectedDateRange.value,
    config: {
      enabled: isVisible,
    },
  })

  const renderItem = useCallback(
    (item: Repository) => (
      <RepoItem
        item={item}
        key={item.id}
        selectedTag={selectedTag}
        analyticsTag={meta.analyticsTag}
        dateRange={dateRange}
      />
    ),
    [meta.analyticsTag, selectedTag, dateRange]
  )

  const headerTitle = useMemo(() => {
    return (
      <>
        Github <span className="blockHeaderHighlight">{selectedTag.label}</span>{' '}
        <span className="blockHeaderHighlight">{selectedDateRange.label.toLowerCase()}</span>
      </>
    )
  }, [selectedTag, selectedDateRange])

  return (
    <Card
      ref={ref}
      fullBlock={true}
      titleComponent={headerTitle}
      settingsComponent={
        <MemoizedCardSettings
          url={meta.link}
          id={meta.value}
          globalTag={GLOBAL_TAG}
          sortBy={sortBy}
          language={language || GLOBAL_TAG.value}
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
              label: 'Stars today',
              value: 'stars_in_range',
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
      <ListRepoComponent
        sortBy={sortBy as keyof Repository}
        items={data}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
        source={meta.value}
      />
    </Card>
  )
}
