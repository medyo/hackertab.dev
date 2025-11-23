import { useMemo, useState } from 'react'
import { AiFillMobile } from 'react-icons/ai'
import { BsChevronDown, BsChevronUp, BsFillGearFill, BsFillShieldLockFill } from 'react-icons/bs'
import { FaDatabase, FaPaintBrush, FaRobot, FaServer } from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { RiDeviceFill } from 'react-icons/ri'
import { SiBnbchain } from 'react-icons/si'
import { ChipsSet, SearchBar } from 'src/components/Elements'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout/SettingsContentLayout'
import { repository } from 'src/config'
import { Tag, useRemoteConfigStore } from 'src/features/remoteConfig'
import { trackLanguageAdd, trackLanguageRemove } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'

const CATEGORY_TO_ICON: Record<string, React.ReactNode> = {
  frontend: <FaPaintBrush className="icon" />,
  backend: <BsFillGearFill className="icon" />,
  fullstack: <RiDeviceFill className="icon" />,
  mobile: <AiFillMobile className="icon" />,
  devops: <FaServer className="icon" />,
  ai: <FaRobot className="icon" />,
  data: <FaDatabase className="icon" />,
  security: <BsFillShieldLockFill className="icon" />,
  blockchain: <SiBnbchain className="icon" />,
}
export const TopicSettings = () => {
  const { userSelectedTags, occupation, followTag, unfollowTag } = useUserPreferences()

  const { tags } = useRemoteConfigStore()
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const filteredTags = useMemo(() => {
    if (searchKeyword.trim() === '') {
      return tags
    }
    return tags.filter(
      (tag) =>
        tag.label.toLowerCase().includes(searchKeyword.trim().toLowerCase()) ||
        tag.category?.toLowerCase().includes(searchKeyword.trim().toLowerCase())
    )
  }, [tags, searchKeyword])

  const groupedTags = useMemo(() => {
    const groups = filteredTags.reduce<Record<string, Tag[]>>((acc, tag) => {
      ;(acc[tag.category || 'Other'] ??= []).push(tag)
      return acc
    }, {})

    if ('Other' in groups) {
      const { Other, ...rest } = groups
      return { ...rest, Other }
    }

    return groups
  }, [filteredTags])

  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    occupation ? [occupation] : ['backend', 'frontend']
  )

  return (
    <SettingsContentLayout
      bodyClassName="topicsBottomSpacer"
      title="Followed Topics"
      description={`Your feed will be tailored by following the technologies you are interested in.`}>
      {userSelectedTags.length > 0 ? (
        <ChipsSet
          canSelectMultiple={true}
          options={userSelectedTags}
          defaultValues={userSelectedTags.map((tag) => tag.value)}
          onChange={(changes) => {
            if (changes.action == 'ADD') {
              followTag(changes.option as Tag)
              trackLanguageAdd(changes.option.value)
            } else {
              unfollowTag(changes.option as Tag)
              trackLanguageRemove(changes.option.value)
            }
          }}
        />
      ) : (
        <div>
          <p className="errorMsg">You are not following any topics yet. Start exploring below!</p>
        </div>
      )}

      <hr />

      <header>
        <div className="settingsHeader">
          <h3 className="title">Explore new topics</h3>
          <p className="description">
            Explore and follow new topics to customize your feed further.
          </p>
        </div>
      </header>
      <div>
        <SearchBar
          iconStart={<IoMdSearch className="searchBarIcon" />}
          placeholder="Search by programming language, framework, or topic"
          onChange={(keyword) => {
            setSearchKeyword(keyword)
          }}
        />
      </div>
      <div className="topicsFlex">
        {Object.keys(groupedTags).length == 0 ? (
          <div>
            <p className="errorMsg">
              No results found, try adjusting your search keyword.
              <br />
              If you think this technology is missing, feel free to{' '}
              <a
                href={`${repository}/issues/new?title=[${searchKeyword}] New technology`}
                target="_blank">
                open an issue
              </a>{' '}
              to suggest it.
            </p>
          </div>
        ) : (
          Object.keys(groupedTags).map((category) => (
            <div key={category}>
              <button
                className="categoryTitle subTitleButton"
                onClick={() =>
                  setExpandedCategories(
                    expandedCategories.includes(category)
                      ? expandedCategories.filter((c) => c !== category)
                      : [...expandedCategories, category]
                  )
                }>
                {CATEGORY_TO_ICON[category.toLowerCase()]} {category}{' '}
                <span className="">
                  {expandedCategories.includes(category) ? (
                    <BsChevronUp className="subTitleIcon" />
                  ) : (
                    <BsChevronDown className="subTitleIcon" />
                  )}
                </span>
              </button>

              {expandedCategories.includes(category) && (
                <ChipsSet
                  className="categoryContent"
                  canSelectMultiple={true}
                  options={groupedTags[category]
                    .sort((a, b) => (a.label > b.label ? 1 : -1))
                    .map((tag) => ({
                      label: tag.label,
                      value: tag.value,
                    }))}
                  defaultValues={userSelectedTags.map((tag) => tag.value)}
                  onChange={(changes) => {
                    if (changes.action == 'ADD') {
                      followTag(changes.option as Tag)
                      trackLanguageAdd(changes.option.value)
                    } else {
                      unfollowTag(changes.option as Tag)
                      trackLanguageRemove(changes.option.value)
                    }
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </SettingsContentLayout>
  )
}
