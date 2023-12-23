import { ChipsSet } from 'src/components/Elements'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout/SettingsContentLayout'
import { SUPPORTED_CARDS } from 'src/config/supportedCards'
import { trackSourceAdd, trackSourceRemove } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { SelectedCard } from 'src/types'
import { RssSetting } from './RssSetting'

export const SourceSettings = () => {
  const { cards, setCards, userCustomCards } = useUserPreferences()

  const mergedSources = [
    ...SUPPORTED_CARDS.map((source) => {
      return {
        label: source.label,
        value: source.value,
        icon: source.icon,
      }
    }),
    ...userCustomCards.map((source) => {
      return {
        label: source.label,
        value: source.value,
        icon: <img src={source.icon as string} alt="" />,
      }
    }),
  ].sort((a, b) => (a.label > b.label ? 1 : -1))

  const defaultValues = [
    ...cards
      .map((source) => SUPPORTED_CARDS.find((sc) => sc.value === source.name))
      .map((v) => v?.value),
    ...userCustomCards.map((source) => source.value),
  ].filter(Boolean) as string[]

  return (
    <SettingsContentLayout
      title="Sources"
      description={`Your feed will be tailored by following the sources you are interested in.`}>
      <>
        <ChipsSet
          canSelectMultiple={true}
          options={mergedSources}
          defaultValues={defaultValues}
          onChange={(changes, selectedChips) => {
            const selectedValues = selectedChips.map((chip) => chip.value)

            const cards = (selectedValues
              .map((source) => SUPPORTED_CARDS.find((sc) => sc.value === source))
              .filter(Boolean)
              .map((source, index) => {
                return {
                  id: index,
                  name: source?.value || '',
                  type: 'supported',
                }
              }) || []) as SelectedCard[]

            setCards(cards)

            if (changes.action == 'ADD') {
              trackSourceAdd(changes.option.value)
            } else {
              trackSourceRemove(changes.option.value)
            }
          }}
        />
        <hr />
        <>
          <header>
            <h3 className="title">Add new Source</h3>
            <p className="description">
              Can't find your favorite source? Add its RSS feed URL here and it will be available in
              your feed.
            </p>
          </header>
          <RssSetting />
        </>
      </>
    </SettingsContentLayout>
  )
}
