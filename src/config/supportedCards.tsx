import { CgIndieHackers } from 'react-icons/cg'
import { FaDev, FaFreeCodeCamp, FaMediumM, FaReddit } from 'react-icons/fa'
import { HiSparkles, HiTicket } from 'react-icons/hi'
import { SiGithub, SiProducthunt, SiYcombinator } from 'react-icons/si'
import HackernoonIcon from 'src/assets/icon_hackernoon.jpeg'
import HashNodeIcon from 'src/assets/icon_hashnode.png'
import LobstersIcon from 'src/assets/icon_lobsters.png'
import { AICard } from 'src/features/cards/components/aiCard'
import { SupportedCardType } from 'src/types'
import { lazyImport } from 'src/utils/lazyImport'
const { MediumCard } = lazyImport(() => import('src/features/cards'), 'MediumCard')
const { ConferencesCard } = lazyImport(() => import('src/features/cards'), 'ConferencesCard')
const { DevtoCard } = lazyImport(() => import('src/features/cards'), 'DevtoCard')
const { FreecodecampCard } = lazyImport(() => import('src/features/cards'), 'FreecodecampCard')
const { GithubCard } = lazyImport(() => import('src/features/cards'), 'GithubCard')
const { HackernewsCard } = lazyImport(() => import('src/features/cards'), 'HackernewsCard')
const { HashnodeCard } = lazyImport(() => import('src/features/cards'), 'HashnodeCard')
const { IndiehackersCard } = lazyImport(() => import('src/features/cards'), 'IndiehackersCard')
const { LobstersCard } = lazyImport(() => import('src/features/cards'), 'LobstersCard')
const { ProductHuntCard } = lazyImport(() => import('src/features/cards'), 'ProductHuntCard')
const { RedditCard } = lazyImport(() => import('src/features/cards'), 'RedditCard')
const { HackernoonCard } = lazyImport(() => import('src/features/cards'), 'HackernoonCard')

export const SUPPORTED_CARDS: SupportedCardType[] = [
  {
    value: 'github',
    analyticsTag: 'github',
    label: 'Github repositories',
    component: GithubCard,
    icon: <SiGithub className="blockHeaderWhite" />,
    link: 'https://github.com/',
    type: 'supported',
  },
  {
    value: 'hackernews',
    icon: <SiYcombinator color="#FB6720" />,
    analyticsTag: 'hackernews',
    label: 'Hackernews',
    component: HackernewsCard,
    link: 'https://news.ycombinator.com/',
    type: 'supported',
  },
  {
    value: 'conferences',
    icon: <HiTicket color="#4EC8AF" />,
    analyticsTag: 'events',
    label: 'Upcoming events',
    component: ConferencesCard,
    link: 'https://confs.tech/',
    type: 'supported',
  },
  {
    value: 'devto',
    icon: <FaDev className="blockHeaderWhite" />,
    analyticsTag: 'devto',
    label: 'DevTo',
    component: DevtoCard,
    link: 'https://dev.to/',
    type: 'supported',
  },
  {
    value: 'producthunt',
    icon: <SiProducthunt color="#D65736" />,
    analyticsTag: 'producthunt',
    label: 'Product Hunt',
    component: ProductHuntCard,
    link: 'https://producthunt.com/',
    type: 'supported',
  },
  {
    value: 'reddit',
    icon: <FaReddit color="#FF4500" />,
    analyticsTag: 'reddit',
    label: 'Reddit',
    component: RedditCard,
    link: 'https://reddit.com/',
    type: 'supported',
  },
  {
    value: 'lobsters',
    icon: <img alt="lobsters" src={LobstersIcon} />,
    analyticsTag: 'lobsters',
    label: 'Lobsters',
    component: LobstersCard,
    link: 'https://lobste.rs/',
    type: 'supported',
  },
  {
    value: 'hashnode',
    icon: <img alt="hn" src={HashNodeIcon} />,
    analyticsTag: 'hashnode',
    label: 'Hashnode',
    component: HashnodeCard,
    link: 'https://hashnode.com/',
    type: 'supported',
  },
  {
    value: 'freecodecamp',
    icon: <FaFreeCodeCamp className="blockHeaderWhite" />,
    analyticsTag: 'freecodecamp',
    label: 'FreeCodeCamp',
    component: FreecodecampCard,
    link: 'https://freecodecamp.com/news',
    type: 'supported',
  },
  {
    value: 'indiehackers',
    icon: <CgIndieHackers className="blockHeaderWhite" />,
    analyticsTag: 'indiehackers',
    label: 'IndieHackers',
    component: IndiehackersCard,
    link: 'https://indiehackers.com/',
    type: 'supported',
  },
  {
    value: 'medium',
    icon: <FaMediumM className="blockHeaderWhite" />,
    analyticsTag: 'medium',
    label: 'Medium',
    component: MediumCard,
    link: 'https://medium.com/',
    type: 'supported',
  },
  {
    value: 'ai',
    icon: <HiSparkles color="#F1D247" />,
    analyticsTag: 'ai',
    label: 'Powered by AI',
    component: AICard,
    type: 'supported',
    link: 'https://hackertab.dev/',
  },
  {
    value: 'hackernoon',
    analyticsTag: 'hackernoon',
    label: 'Hackernoon',
    component: HackernoonCard,
    icon: <img alt="hackernoon" src={HackernoonIcon} />,
    link: 'https://hackernoon.com/',
    type: 'supported',
  },
]
