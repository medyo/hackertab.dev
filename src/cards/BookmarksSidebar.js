import React, { useContext } from "react";
import { VscChromeClose } from 'react-icons/vsc';
import { SiYcombinator } from 'react-icons/si';
import { HiTicket } from 'react-icons/hi';
import { SiStackoverflow } from 'react-icons/si';
import { SiGithub } from 'react-icons/si';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import PreferencesContext from '../contexts/PreferencesContext';
import CardLink from "./CardLink";

const BookmarkItem = ({ item }) => (
    <MenuItem>
        <CardLink link={item.url} >{`${item.title}`}</CardLink>
    </MenuItem>
)

function BookmarksSidebar({ showSidebar, onClose }) {

    const { userBookmarks = [] } = useContext(PreferencesContext)
    const githubBookmarks = userBookmarks.filter(bm => bm.source == "github")
    const jobsBookmarks = userBookmarks.filter(bm => bm.source == "jobs")
    const newsBookmarks = userBookmarks.filter(bm => ["hackernews", "devto"].indexOf(bm.source) != -1)
    const conferencesBookmarks = userBookmarks.filter(bm => bm.source == "conferences")

    return (
        <ProSidebar className="sidebar block" collapsed={!showSidebar} collapsedWidth={"5px"} width={"33%"}>
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span style={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14, letterSpacing: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',}}>Bookmarks</span>
                    <span style={{cursor: 'pointer', display: "flex"}} onClick={onClose}><VscChromeClose /></span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">

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