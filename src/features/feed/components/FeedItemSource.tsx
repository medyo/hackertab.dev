import { FaDev, FaMediumM, FaReddit } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { SiGithub, SiProducthunt } from 'react-icons/si'
import HashNodeIcon from 'src/assets/icon_hashnode.png'
const FeedItemKV: {
  [key: string]: React.ReactNode
} = {
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
}
export const FeedItemSource = ({ source }: { source: string }) => {
  return (
    FeedItemKV[source] || (
      <>
        <GoDotFill className="rowItemIcon" /> {source}
      </>
    )
  )
}
