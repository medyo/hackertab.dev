import React, { useContext } from "react";
import './Sidebar.css';
import { VscChromeClose } from 'react-icons/vsc';
import { TiDelete } from 'react-icons/ti';
import { HiTicket } from 'react-icons/hi';
import { SiGithub, SiReddit, SiProducthunt, SiYcombinator } from 'react-icons/si'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import PreferencesContext from '../preferences/PreferencesContext';
import CardLink from "../components/CardLink";
import { trackUnbookmarkFrom } from "../utils/Analytics"


const BookmarkItem = ({ item, appendRef = true }) => {
  const { dispatcher } = useContext(PreferencesContext)
  const unBookmark = () => {
    dispatcher({ type: 'unBookmarkItem', value: item })
    trackUnbookmarkFrom(item.source)
  }
  return (
    <MenuItem
      suffix={<span className="unbookmarkBtn" onClick={unBookmark}><TiDelete /></span>}
    >
      <CardLink link={item.url} appendRef={appendRef}>{`${item.title}`}</CardLink>
    </MenuItem>
  )
}

function BookmarksSidebar({ showSidebar, onClose }) {

  const { userBookmarks = [] } = useContext(PreferencesContext)
  const githubBookmarks = userBookmarks.filter(bm => bm.source == "github")
  const jobsBookmarks = userBookmarks.filter(bm => bm.source == "jobs")
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
      ].indexOf(bm.source) != -1
  )
  const conferencesBookmarks = userBookmarks.filter(bm => bm.source == "conferences")
  const productsBookmarks = userBookmarks.filter(bm => bm.source == "producthunt")
  const redditBookmarks = userBookmarks.filter(bm => bm.source == "reddit")

  return (
    <ProSidebar className="sidebar"
      collapsed={!showSidebar}
      collapsedWidth={"0px"}
      width={"14%"}>
      <SidebarHeader>
        <div className="sidebarHeader">
          <span className="title">Bookmarks</span>
          <span className="closeBtn" onClick={onClose}><VscChromeClose /></span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">

          <SubMenu
            title="Github Repos" icon={<SiGithub />}
            suffix={<span className="badge yellow">{githubBookmarks.length}</span>}
          >
            {
              githubBookmarks.map((bm, index) => (<BookmarkItem item={bm} key={`gh-${index}`} />))
            }

          </SubMenu>

          <SubMenu title="News & Articles" icon={<SiYcombinator />}
            suffix={<span className="badge yellow">{newsBookmarks.length}</span>}
          >
            {
              newsBookmarks.map((bm, index) => (<BookmarkItem item={bm} key={`ne-${index}`} />))
            }
          </SubMenu>

          <SubMenu
            title="Product Hunt" icon={<SiProducthunt />}
            suffix={<span className="badge yellow">{productsBookmarks.length}</span>}
          >
            {
              productsBookmarks.map((bm, index) => (<BookmarkItem item={bm} key={`gh-${index}`} appendRef={false} />))
            }

          </SubMenu>

          <SubMenu title="Conferences" icon={<HiTicket />}
            suffix={<span className="badge yellow">{conferencesBookmarks.length}</span>}
          >
            {
              conferencesBookmarks.map((bm, index) => (<BookmarkItem item={bm} key={`co-${index}`} />))
            }
          </SubMenu>
          <SubMenu title="Reddit" icon={<SiReddit />}
            suffix={<span className="badge yellow">{redditBookmarks.length}</span>}
          >
            {
              redditBookmarks.map((bm, index) => (<BookmarkItem item={bm} key={`co-${index}`} />))
            }
          </SubMenu>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  )
}

export default BookmarksSidebar