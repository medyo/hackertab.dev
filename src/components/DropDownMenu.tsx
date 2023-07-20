import { Item, Menu, MenuId, animation, useContextMenu } from 'react-contexify'
import { RiArrowDownSFill } from 'react-icons/ri'

type Option = {
  label: string
  value: string
}

type DropDownMenuProps = {
  data: Option[]
  tagId: string
  label: string
  setSelectedDropDownItem: (option: Option) => void
}
export const DropDownMenu = ({
  data,
  tagId,
  label,
  setSelectedDropDownItem,
}: DropDownMenuProps) => {
  const { show: showMenu } = useContextMenu()

  const displayMenu = (e: React.MouseEvent<HTMLSpanElement>) => {
    const targetId = e.currentTarget.getAttribute('data-target-id')
    if (targetId) {
      showMenu(e, { id: targetId as unknown as MenuId })
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
