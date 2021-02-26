import React, { useContext } from "react";
import '../Sidebar.css';
import { VscChromeClose } from 'react-icons/vsc';
import { SiYcombinator } from 'react-icons/si';
import { TiDelete } from 'react-icons/ti';
import { HiTicket } from 'react-icons/hi';
import { SiStackoverflow } from 'react-icons/si';
import { SiGithub } from 'react-icons/si';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import PreferencesContext from '../contexts/PreferencesContext';
import CardLink from "./CardLink";
import { trackUnbookmarkFrom } from "../utils/Analytics"


const BookmarkItem = ({ item }) => {
    const { dispatcher } = useContext(PreferencesContext)
    const unBookmark = () => {
        dispatcher({type: 'unBookmarkItem', value: item})
        trackUnbookmarkFrom(item.source)
    }
    return (
        <MenuItem 
            suffix={<span className="unbookmarkBtn" onClick={unBookmark}><TiDelete /></span>}
        >
            <CardLink link={item.url} >{`${item.title}`}</CardLink> 
        </MenuItem>
    )
}

function BookmarksSidebar({ showSidebar, onClose }) {

    const { userBookmarks = [] } = useContext(PreferencesContext)
    const githubBookmarks = userBookmarks.filter(bm => bm.source == "github")
    const jobsBookmarks = userBookmarks.filter(bm => bm.source == "jobs")
    const newsBookmarks = userBookmarks.filter(bm => ["hackernews", "devto"].indexOf(bm.source) != -1)
    const conferencesBookmarks = userBookmarks.filter(bm => bm.source == "conferences")

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

                    <SubMenu title="Featured Jobs" icon={<SiStackoverflow />}
                        suffix={<span className="badge yellow">{jobsBookmarks.length}</span>}
                    >
                        {
                            jobsBookmarks.map((bm, index) => (<BookmarkItem item={bm} key={`ft-${index}`} />))
                        }
                    </SubMenu>
                    <SubMenu title="Conferences" icon={<HiTicket />}
                        suffix={<span className="badge yellow">{conferencesBookmarks.length}</span>}
                    >
                        {
                            conferencesBookmarks.map((bm, index) => (<BookmarkItem item={bm} key={`co-${index}`} />))
                        }
                    </SubMenu>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    )
}

export default BookmarksSidebar