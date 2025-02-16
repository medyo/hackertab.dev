import { useRef } from 'react'
import { RiFileDownloadFill, RiFileUploadFill } from 'react-icons/ri'
import toast from 'react-simple-toasts'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout'
import { useAuth, User } from 'src/features/auth'
import { BookmarkedPost } from 'src/features/bookmarks'
import { useBookmarks } from 'src/stores/bookmarks'
import { BookmarkItem } from '../BookmarkSettings'
import './profileSettings.css'

interface UserInfoProps {
  user: User
}

const UserInfo = ({ user }: UserInfoProps) => {
  const { logout } = useAuth()

  return (
    <div className="userCard">
      {user?.imageURL && <img src={user.imageURL} className="userImage"></img>}
      <div className="userInfos">
        <div className="userName">{user.name}</div>
        <div className="userEmail">{user?.email}</div>
      </div>
      <div className="actions">
        <button className="logoutBtn" onClick={logout}>
          Logout
        </button>
        <button className="logoutBtn" onClick={() => {}}>
          Delete account
        </button>
      </div>
    </div>
  )
}

export const ProfileSettings = () => {
  const { user } = useAuth()

  const inputFile = useRef<HTMLInputElement | null>(null)
  const { initState, userBookmarks } = useBookmarks()

  const importBookmarks = () => {
    inputFile.current?.click()
  }

  const exportBookmarks = () => {
    const blob = new Blob([JSON.stringify(userBookmarks, null, 2)], {
      type: 'application/json',
    })
    const downloadURL = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadURL
    link.download = 'hackertabBookmarks'
    link.click()
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const importData: BookmarkedPost[] = JSON.parse(reader.result as string)
        const validatedData = importData
          .filter(
            (data: BookmarkedPost) =>
              data.title &&
              data.url &&
              !userBookmarks.some((bm) => bm.title === data.title && bm.url === data.url)
          )
          .map((data) => ({
            title: data.title,
            url: data.url,
            source: data.source || '',
            sourceType: data.sourceType || '',
          }))
        initState({
          userBookmarks: [...userBookmarks, ...validatedData],
        })
        toast('Your bookmarks have been successfully imported', { theme: 'defaultToast' })
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="profile">
      {user != null && <UserInfo user={user} />}
      <SettingsContentLayout
        title="Bookmarks"
        description="Find all your bookmarks here. You can remove a bookmark by clicking on the remove icon."
        actions={
          <>
            <input
              type="file"
              id="file"
              ref={inputFile}
              accept="application/json"
              className="hidden"
              onChange={handleFileChange}
            />
            <button className="extraBtn extraTextBtn" onClick={() => importBookmarks()}>
              <RiFileUploadFill />
              &nbsp;Import
            </button>
            <button className="extraBtn" onClick={() => exportBookmarks()}>
              <RiFileDownloadFill />
            </button>
          </>
        }>
        <div className="bookmarks">
          {userBookmarks.map((bm) => (
            <BookmarkItem item={bm} key={bm.url} />
          ))}
        </div>
      </SettingsContentLayout>
    </div>
  )
}
