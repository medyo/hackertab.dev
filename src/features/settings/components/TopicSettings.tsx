import { ChipsSet } from 'src/components/Elements'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout/SettingsContentLayout'
import { Tag, useRemoteConfigStore } from 'src/features/remoteConfig'
import { trackLanguageAdd, trackLanguageRemove } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'

export const TopicSettings = () => {
  const { userSelectedTags, setTags } = useUserPreferences()

  const { supportedTags } = useRemoteConfigStore()

  const tags = supportedTags
    .map((tag) => {
      return {
        label: tag.label,
        value: tag.value,
      }
    })
    .sort((a, b) => (a.label > b.label ? 1 : -1))

  return (
    <SettingsContentLayout
      title="Topics"
      description={`Your feed will be tailored by following the technologies you are interested in.`}>
      <ChipsSet
        canSelectMultiple={true}
        options={tags}
        defaultValues={userSelectedTags.map((tag) => tag.value)}
        onChange={(changes, selectedChips) => {
          const selectedTags =
            (selectedChips
              .map((tag) => supportedTags.find((st) => st.value === tag.value))
              .filter(Boolean) as Tag[]) || []
          setTags(selectedTags)

          if (changes.action == 'ADD') {
            trackLanguageAdd(changes.option.value)
          } else {
            trackLanguageRemove(changes.option.value)
          }
        }}
      />
    </SettingsContentLayout>
  )
}
