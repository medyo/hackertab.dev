import clsx from 'clsx'
import { useState } from 'react'
import { AiFillMobile, AiFillSecurityScan } from 'react-icons/ai'
import { BsArrowRight, BsFillGearFill } from 'react-icons/bs'
import { FaDatabase, FaPaintBrush, FaRobot, FaServer } from 'react-icons/fa'
import { RiDeviceFill } from 'react-icons/ri'
import { TbDots } from 'react-icons/tb'
import { StepProps } from 'src/components/Elements'
import { Occupation } from '../../types'

const OCCUPATIONS: Occupation[] = [
  {
    title: 'Front-End Engineer',
    icon: FaPaintBrush,
    sources: ['devto', 'github', 'medium', 'hashnode'],
    tags: ['javascript', 'typescript'],
  },
  {
    title: 'Back-End Engineer',
    icon: BsFillGearFill,
    sources: ['devto', 'github', 'medium', 'hashnode'],
    tags: ['go', 'php', 'ruby', 'rust', 'r'],
  },
  {
    title: 'Full Stack Engineer',
    icon: RiDeviceFill,
    sources: ['devto', 'github', 'medium', 'hashnode'],
    tags: ['javascript', 'typescript', 'php', 'ruby', 'rust'],
  },
  {
    title: 'Mobile',
    icon: AiFillMobile,
    sources: ['reddit', 'github', 'medium', 'hashnode'],
    tags: ['android', 'kotlin', 'java', 'swift', 'objective-c'],
  },
  {
    title: 'Devops Engineer',
    icon: FaServer,
    sources: ['freecodecamp', 'github', 'reddit', 'devto'],
    tags: ['devops', 'bash'],
  },
  {
    title: 'Data Engineer',
    icon: FaDatabase,
    sources: ['freecodecamp', 'github', 'reddit', 'devto'],
    tags: ['data-science', 'python', 'artificial-intelligence', 'machine-learning'],
  },
  {
    title: 'Security Engineer',
    icon: AiFillSecurityScan,
    sources: ['freecodecamp', 'github', 'reddit', 'devto'],
    tags: ['c++', 'bash', 'python'],
  },
  {
    title: 'ML Engineer',
    icon: FaRobot,
    sources: ['github', 'freecodecamp', 'hackernews', 'devto'],
    tags: ['machine-learning', 'artificial-intelligence', 'python'],
  },
  {
    title: 'Other',
    icon: TbDots,
    sources: ['hackernews', 'github', 'producthunt', 'devto'],
    tags: [],
  },
]

export const HelloTab = ({
  moveToNext,
  moveToPrevious,
  setTabsData,
  tabsData,
}: StepProps<Occupation>) => {
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation | undefined>(
    tabsData || OCCUPATIONS[0]
  )
  const onOccupationClicked = (occupation: Occupation) => {
    setSelectedOccupation(occupation)
  }

  const onClickNext = () => {
    if (selectedOccupation === undefined) {
      return
    }

    setTabsData(selectedOccupation)
    moveToNext && moveToNext()
  }
  return (
    <div>
      <div className="tabHeader">
        <h1 className="tabTitle">Hi, 👋 Welcome to Hackertab</h1>
        <p className="tabBody">Let's customize your Hackertab experience!</p>
      </div>
      <div className="occupations">
        {OCCUPATIONS.map((occ, index) => {
          return (
            <button
              key={occ.title}
              onClick={() => onOccupationClicked(occ)}
              className={clsx('occupation', selectedOccupation?.title === occ.title && 'active')}>
              <span>
                <occ.icon className="occupationIcon" />
              </span>
              <h3 className="occupationTitle">{occ.title}</h3>
            </button>
          )
        })}
      </div>
      <div className="tabFooter">
        <button onClick={() => moveToPrevious && moveToPrevious()}>Skip</button>
        <button className="positiveButton" onClick={() => onClickNext()}>
          <BsArrowRight /> Next
        </button>
      </div>
    </div>
  )
}
