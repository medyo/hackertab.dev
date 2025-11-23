import clsx from 'clsx'
import { AiFillMobile, AiFillSecurityScan } from 'react-icons/ai'
import { BsArrowRight, BsFillGearFill } from 'react-icons/bs'
import { FaDatabase, FaPaintBrush, FaRobot, FaServer } from 'react-icons/fa'
import { RiDeviceFill } from 'react-icons/ri'
import { TbDots } from 'react-icons/tb'
import { Tag, useRemoteConfigStore } from 'src/features/remoteConfig'
import { useUserPreferences } from 'src/stores/preferences'
import { Occupation } from '../../types'

const OCCUPATIONS: Occupation[] = [
  {
    title: 'Front-End Engineer',
    value: 'frontend',
    icon: FaPaintBrush,
    sources: ['devto', 'github', 'medium', 'hashnode'],
    tags: ['frontend', 'javascript', 'typescript', 'css', 'react', 'vue', 'angular'],
  },
  {
    title: 'Back-End Engineer',
    value: 'backend',
    icon: BsFillGearFill,
    sources: ['devto', 'github', 'medium', 'hashnode'],
    tags: ['backend', 'go', 'php', 'ruby', 'rust', 'r'],
  },
  {
    title: 'Full Stack Engineer',
    icon: RiDeviceFill,
    value: 'fullstack',
    sources: ['devto', 'github', 'medium', 'hashnode'],
    tags: ['javascript', 'typescript', 'php', 'ruby', 'rust'],
  },
  {
    title: 'Mobile',
    value: 'mobile',
    icon: AiFillMobile,
    sources: ['reddit', 'github', 'medium', 'hashnode'],
    tags: [
      'android',
      'mobile',
      'kotlin',
      'java',
      'ios',
      'swift',
      'objectivec',
      'react native',
      'flutter',
    ],
  },
  {
    title: 'Devops Engineer',
    value: 'devops',
    icon: FaServer,
    sources: ['hackernoon', 'github', 'reddit', 'hackernews'],
    tags: ['devops', 'kubernetes', 'docker', 'bash'],
  },
  {
    title: 'Data Engineer',
    value: 'data',
    icon: FaDatabase,
    sources: ['hackernoon', 'github', 'reddit', 'devto'],
    tags: ['data science', 'python', 'artificial intelligence', 'machine learning'],
  },
  {
    title: 'Security Engineer',
    value: 'security',
    icon: AiFillSecurityScan,
    sources: ['hackernoon', 'github', 'reddit', 'devto'],
    tags: ['security', 'cpp', 'bash', 'python'],
  },
  {
    title: 'ML Engineer',
    value: 'ai',
    icon: FaRobot,
    sources: ['github', 'hackernoon', 'hackernews', 'devto'],
    tags: ['machine learning', 'artificial intelligence', 'python'],
  },
  {
    title: 'Other',
    value: 'other',
    icon: TbDots,
    sources: ['hackernews', 'github', 'producthunt', 'devto'],
    tags: ['webdev', 'mobile'],
  },
]

export const HelloTab = () => {
  const { markOnboardingAsCompleted, setCards, setTags, setOccupation, occupation } =
    useUserPreferences()

  const { tags } = useRemoteConfigStore()

  const onStartClicked = () => {
    const selectedOccupation = OCCUPATIONS.find((occ) => occ.title === occupation)
    if (selectedOccupation) {
      setOccupation(selectedOccupation.value)
      setCards(
        selectedOccupation.sources.map((source, index) => ({
          id: index,
          name: source,
          type: 'supported',
        }))
      )
      const userTags = selectedOccupation.tags
        .map((tag) => {
          return tags.find((t) => t.value === tag)
        })
        .filter(Boolean) as Array<Tag>

      setTags(userTags)
    }

    markOnboardingAsCompleted()
  }

  return (
    <div>
      <div className="tabHeader">
        <h1 className="tabTitle">👋 Let’s set up your Hackertab</h1>
        <p className="tabBody">Select your developer role 👨🏻‍💻 to personalize your Hackertab.</p>
      </div>
      <div className="occupations">
        {OCCUPATIONS.map((occ) => {
          return (
            <button
              key={occ.title}
              onClick={() => setOccupation(occ.title)}
              className={clsx('occupation', occupation === occ.title && 'active')}>
              <span>
                <occ.icon className="occupationIcon" />
              </span>
              <h3 className="occupationTitle">{occ.title}</h3>
            </button>
          )
        })}
      </div>
      <div className="tabFooter">
        {occupation && (
          <button className="positiveButton" onClick={onStartClicked}>
            <BsArrowRight /> Start now
          </button>
        )}
      </div>
    </div>
  )
}
