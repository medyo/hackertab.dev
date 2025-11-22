import { memo, useState } from 'react'
import { FaDev, FaMediumM, FaReddit } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { SiGithub, SiProducthunt, SiYcombinator } from 'react-icons/si'
import HashNodeIcon from 'src/assets/icon_hashnode.png'
import LobstersIcon from 'src/assets/icon_lobsters.png'

const SOURCE_MAP: Record<string, React.ReactNode> = {
  producthunt: (
    <>
      <SiProducthunt color="#D65736" /> Product hunt
    </>
  ),
  github: (
    <>
      <SiGithub className="blockHeaderWhite" /> Github
    </>
  ),
  reddit: (
    <>
      <FaReddit color="#FF4500" /> Reddit
    </>
  ),
  medium: (
    <>
      <FaMediumM className="blockHeaderWhite" /> Medium
    </>
  ),
  devto: (
    <>
      <FaDev className="blockHeaderWhite" /> Dev.to
    </>
  ),
  hashnode: (
    <>
      <img alt="hn" className="feedItemSource" src={HashNodeIcon} /> Hashnode
    </>
  ),
  hackernews: (
    <>
      <SiYcombinator color="#FB6720" /> Hackernews
    </>
  ),
  lobsters: (
    <>
      <img alt="lobsters" className="feedItemSource" src={LobstersIcon} /> Lobsters
    </>
  ),
}
export const FeedItemSource = memo(({ source }: { source: string }) => {
  const [fallback, setFallback] = useState(false)

  if (SOURCE_MAP[source]) {
    return SOURCE_MAP[source]
  }

  if (!fallback && source.includes('.')) {
    return (
      <>
        <img
          src={`https://icons.duckduckgo.com/ip3/${source}.ico`}
          alt={source}
          className="feedItemSourceFallback"
          onError={() => {
            setFallback(true)
          }}
        />{' '}
        <span className="sourceName">{source}</span>
      </>
    )
  }

  return (
    <>
      <GoDotFill className="rowItemIcon" /> <span className="sourceName">{source}</span>
    </>
  )
})
