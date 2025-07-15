import { useMemo, useState } from 'react'
import { ChipsSet, ConfirmModal } from 'src/components/Elements'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout/SettingsContentLayout'
import { SUPPORTED_CARDS } from 'src/config/supportedCards'
import { trackSourceAdd, trackSourceRemove } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Option, SelectedCard } from 'src/types'
import { RssSetting } from './RssSetting'

export const SourceSettings = () => {
  const { cards, setCards, userCustomCards, setUserCustomCards } = useUserPreferences()
  const [confirmDelete, setConfirmDelete] = useState<{
    showModal: boolean
    option?: Option
  }>({
    showModal: false,
    option: undefined,
  })

  const mergedSources = useMemo(() => {
    return [
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
          removeable: true,
          icon: <img src={source.icon as string} alt="" />,
        }
      }),
    ].sort((a, b) => (a.label > b.label ? 1 : -1))
  }, [userCustomCards])

  return (
    <SettingsContentLayout
      title="Sources"
      description={`Your feed will be tailored by following the sources you are interested in.`}>
      <>
        <ConfirmModal
          showModal={confirmDelete.showModal}
          title={`Confirm delete source: ${confirmDelete.option?.label}`}
          description={`Are you sure you want to delete ${confirmDelete.option?.label} source? This action cannot be undone.`}
          onClose={() =>
            setConfirmDelete({
              showModal: false,
              option: undefined,
            })
          }
          onConfirm={() => {
            if (!confirmDelete.option) {
              return
            }

            const newUserCards = userCustomCards.filter(
              (card) => card.value !== confirmDelete.option?.value
            )
            const newCards = cards.filter((card) => card.name !== confirmDelete.option?.value)
            setCards(newCards)
            setUserCustomCards(newUserCards)
            setConfirmDelete({ showModal: false, option: undefined })
          }}
        />
        <ChipsSet
          canSelectMultiple={true}
          options={mergedSources}
          defaultValues={cards.map((source) => source.name)}
          onRemove={(option) => {
            setConfirmDelete({ showModal: true, option: option })
          }}
          onChange={(changes, selectedChips) => {
            const selectedValues = selectedChips.map((chip) => chip.value)

            const cards = selectedValues
              .map((source, index) => {
                if (SUPPORTED_CARDS.find((sc) => sc.value === source)) {
                  return {
                    id: index,
                    name: source,
                    type: 'supported',
                  }
                } else if (userCustomCards.find((ucc) => ucc.value === source)) {
                  return {
                    id: index,
                    name: source,
                    type: 'rss',
                  }
                }
                return null
              })
              .filter(Boolean) as SelectedCard[]

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
            <div className="settingsHeader">
              <h3 className="title">Add new Source</h3>
              <p className="description">
                Can't find your favorite source? Add its RSS feed URL here and it will be available
                in your feed.
              </p>
            </div>
          </header>
          <RssSetting />
        </>
      </>
    </SettingsContentLayout>
  )
}
