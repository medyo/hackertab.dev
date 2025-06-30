import { Item, Menu, MenuId, animation, useContextMenu } from 'react-contexify'
import { RiArrowDownSFill } from 'react-icons/ri'
import { Button } from './Elements'

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
      <Button
        type="text"
        onClick={(e) => displayMenu(e)}
        className="inline-flex items-center justify-center gap-2 text-center"
        tagId={tagId}>
        <span>{label}</span>
        <RiArrowDownSFill />
      </Button>
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
