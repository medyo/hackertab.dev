import { RiArrowDownSFill } from 'react-icons/ri'
import { useContextMenu } from 'react-contexify'

const DropDownMenu = ({ tagId, label }) => {
  const { show: showMenu } = useContextMenu()

  const displayMenu = (e) => {
    const {
      target: {
        dataset: { targetId },
      },
    } = e
    if (targetId) {
      showMenu(e, { id: targetId })
    }
  }

  return (
    <span onClick={displayMenu} className="headerSelect" data-target-id={tagId}>
      {label}
      <RiArrowDownSFill className="headerSelectIcon" />
    </span>
  )
}

export default DropDownMenu
