import { useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import { getRssUrlFeed } from 'src/features/cards'
import { identifyUserCards, trackRssSourceAdd } from 'src/lib/analytics'
import { isValidURL } from 'src/utils/UrlUtils'

import { BsRssFill } from 'react-icons/bs'
import { useUserPreferences } from 'src/stores/preferences'
import { SupportedCardType } from 'src/types'

export const RssSetting = () => {
  const { cards, setCards, userCustomCards, setUserCustomCards } = useUserPreferences()
  const [rssUrl, setRssUrl] = useState<string | undefined>()
  const [RssInputFeedback, setRssInputFeedback] = useState<string | undefined>()
  const [isRssInputLoading, setIsRssInputLoading] = useState<boolean>(false)

  const onRssAddClick = async () => {
    if (!rssUrl) {
      setRssInputFeedback('Please provide an RSS Feed URL')
      return
    }

    if (!isValidURL(rssUrl)) {
      setRssInputFeedback('Invalid RSS Feed URL. Please check and try again')
      return
    }

    setIsRssInputLoading(true)

    try {
      const info = await getRssUrlFeed(rssUrl)
      let value = info.title.toLowerCase()

      if (userCustomCards.some((card) => card.link === info.link)) {
        setRssInputFeedback('RSS Feed already exists')
        return
      }

      let customCard: SupportedCardType = {
        feedUrl: rssUrl,
        label: info.title,
        value,
        analyticsTag: value,
        link: info.link,
        type: 'rss',
        icon: info.icon,
      }
      setUserCustomCards([...userCustomCards, customCard])
      const newCards = [
        ...cards,
        { id: cards.length, name: customCard.value, type: customCard.type },
      ]
      setCards(newCards)
      //setSelectedCards(newCards)
      identifyUserCards(newCards.map((card) => card.name))
      trackRssSourceAdd(customCard.value)
      setRssUrl('')
      setRssInputFeedback('RSS Feed Added')
    } catch (_) {
      setRssInputFeedback('Error occured. Please check and try again')
    } finally {
      setIsRssInputLoading(false)
    }
  }

  return (
    <div className="settingRow">
      <p className="settingTitle">RSS Feed URL</p>
      <div className="settingContent">
        <div className="form">
          <input
            type="text"
            value={rssUrl || ''}
            onChange={(e) => setRssUrl(e.target.value)}
            placeholder="https://url.com/rss/feed"
          />
          {isRssInputLoading ? (
            <BeatLoader color={'#A9B2BD'} loading={isRssInputLoading} size={6} />
          ) : (
            <div>
              <button className="rssButton" onClick={onRssAddClick}>
                <BsRssFill /> Add
              </button>
            </div>
          )}
        </div>
        {RssInputFeedback && (
          <div className="settingHint">
            <p>{RssInputFeedback}</p>
          </div>
        )}
      </div>
    </div>
  )
}
