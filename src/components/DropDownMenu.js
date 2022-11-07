import { RiArrowDownSFill } from 'react-icons/ri'
import { Menu, Item, animation, useContextMenu } from 'react-contexify'

const DropDownMenu = ({ data, tagId, label, setSelectedDropDownItem }) => {
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
    <>
      <span onClick={displayMenu} className="headerSelect" data-target-id={tagId}>
        {label}
        <RiArrowDownSFill className="headerSelectIcon" />
      </span>
      <Menu id={tagId} animation={animation.fade}>
        {data &&
          data.map((tag) => {
            return (
              <Item key={tag.value} onClick={() => setSelectedDropDownItem(tag)}>
                {tag.label}
              </Item>
            )
          })}
      </Menu>
    </>
  )
}

export default DropDownMenu
