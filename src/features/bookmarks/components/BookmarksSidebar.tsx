import React from 'react'
import './Sidebar.css'
import { VscChromeClose } from 'react-icons/vsc'
import { TiDelete } from 'react-icons/ti'
import { HiTicket } from 'react-icons/hi'
import { SiGithub, SiReddit, SiProducthunt, SiYcombinator } from 'react-icons/si'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import CardLink from '../../../components/CardLink'
import { trackLinkUnBookmark, Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'

type BookmarkItemProps = {
  item: {
    url: string
    title: string
    source: string
  }
  appendRef?: boolean
}
const BookmarkItem = ({ item, appendRef = true }: BookmarkItemProps) => {
  const { unbookmarkPost } = useUserPreferences()
  const analyticsAttrs = {
    [Attributes.TRIGERED_FROM]: 'bookmarks',
    [Attributes.TITLE]: item.title,
    [Attributes.LINK]: item.url,
    [Attributes.SOURCE]: item.source,
  }
  const unBookmark = () => {
    unbookmarkPost(item)
    trackLinkUnBookmark(analyticsAttrs)
  }
  return (
    <MenuItem
      suffix={
        <span className="unbookmarkBtn" onClick={unBookmark}>
          <TiDelete />
        </span>
      }>
      <CardLink
        link={item.url}
        appendRef={appendRef}
        analyticsAttributes={analyticsAttrs}
        className="">
        {`${item.title}`}
      </CardLink>
    </MenuItem>
  )
}

type BookmarksSidebarTtypes = {
  showSidebar: boolean
  onClose: () => void
}
export const BookmarksSidebar = ({ showSidebar, onClose }: BookmarksSidebarTtypes) => {
  const { userBookmarks } = useUserPreferences()
  const githubBookmarks = userBookmarks.filter((bm) => bm.source === 'github')
  const newsBookmarks = userBookmarks.filter(
    (bm) =>
      [
        'hackernews',
        'devto',
        'hashnode',
        'lobsters',
        'freecodecamp',
        'medium',
        'indiehackers',
      ].indexOf(bm.source) !== -1
  )
  const conferencesBookmarks = userBookmarks.filter((bm) => bm.source === 'conferences')
  const productsBookmarks = userBookmarks.filter((bm) => bm.source === 'producthunt')
  const redditBookmarks = userBookmarks.filter((bm) => bm.source === 'reddit')

  return (
    <ProSidebar className="sidebar" collapsed={!showSidebar} collapsedWidth={'0px'} width={'14%'}>
      <SidebarHeader>
        <div className="sidebarHeader">
          <span className="title">Bookmarks</span>
          <span className="closeBtn" onClick={onClose}>
            <VscChromeClose />
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <SubMenu
            title="Github Repos"
            icon={<SiGithub />}
            suffix={<span className="badge yellow">{githubBookmarks.length}</span>}>
            {githubBookmarks.map((bm, index) => (
              <BookmarkItem item={bm} key={`gh-${index}`} />
            ))}
          </SubMenu>

          <SubMenu
            title="News & Articles"
            icon={<SiYcombinator />}
            suffix={<span className="badge yellow">{newsBookmarks.length}</span>}>
            {newsBookmarks.map((bm, index) => (
              <BookmarkItem item={bm} key={`ne-${index}`} />
            ))}
          </SubMenu>

          <SubMenu
            title="Product Hunt"
            icon={<SiProducthunt />}
            suffix={<span className="badge yellow">{productsBookmarks.length}</span>}>
            {productsBookmarks.map((bm, index) => (
              <BookmarkItem item={bm} key={`gh-${index}`} appendRef={false} />
            ))}
          </SubMenu>

          <SubMenu
            title="Conferences"
            icon={<HiTicket />}
            suffix={<span className="badge yellow">{conferencesBookmarks.length}</span>}>
            {conferencesBookmarks.map((bm, index) => (
              <BookmarkItem item={bm} key={`co-${index}`} />
            ))}
          </SubMenu>
          <SubMenu
            title="Reddit"
            icon={<SiReddit />}
            suffix={<span className="badge yellow">{redditBookmarks.length}</span>}>
            {redditBookmarks.map((bm, index) => (
              <BookmarkItem item={bm} key={`co-${index}`} />
            ))}
          </SubMenu>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  )
}

export default BookmarksSidebar
