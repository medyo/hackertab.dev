import { useRef, useState } from 'react'
import { BiBookmarkMinus } from 'react-icons/bi'
import toast from 'react-simple-toasts'
import { CardLink } from 'src/components/Elements'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout'
import { SUPPORTED_CARDS } from 'src/config/supportedCards'
import { BookmarkedPost } from 'src/features/bookmarks'
import { Attributes, trackLinkUnBookmark } from 'src/lib/analytics'
import { useBookmarks } from 'src/stores/bookmarks'
import { useUserPreferences } from 'src/stores/preferences'
import './bookmarkSettings.css'

type BookmarkItemProps = {
  item: BookmarkedPost
  appendRef?: boolean
}
const BookmarkItem = ({ item, appendRef = false }: BookmarkItemProps) => {
  const { unbookmarkPost } = useBookmarks()
  const { userCustomCards } = useUserPreferences()

  const AVAILABLE_CARDS = [...SUPPORTED_CARDS, ...userCustomCards]
  const source = AVAILABLE_CARDS.find((card) => card.value === item.source)

  const analyticsAttrs = {
    [Attributes.TRIGERED_FROM]: 'bookmarks',
    [Attributes.TITLE]: item.title,
    [Attributes.LINK]: item.url,
    [Attributes.SOURCE]: item.source,
  }
  const unBookmark = () => {
    unbookmarkPost(item)
    trackLinkUnBookmark(analyticsAttrs)
    toast('Link removed from the bookmarks', { theme: 'defaultToast' })
  }
  return (
    <div className="bookmarkItem">
      <CardLink
        className="body"
        link={item.url}
        appendRef={appendRef}
        analyticsAttributes={analyticsAttrs}>
        <div className="title">{item.title}</div>
        {source && (
          <div className="source">
            {source.type === 'supported' ? (
              <span className="icon">{source.icon}</span>
            ) : (
              <img className="icon" src={source.icon as string} alt="" />
            )}
            <span>{source.label}</span>
          </div>
        )}
      </CardLink>
      <div className="actions">
        <button className="btn" aria-label="Remove from bookmarks" onClick={unBookmark}>
          <BiBookmarkMinus />
        </button>
      </div>
    </div>
  )
}

export const BookmarkSettings = () => {
  const inputFile = useRef<HTMLInputElement | null>(null)
  const {initState, userBookmarks } = useBookmarks()

  const importBookmarks = () => {
    inputFile.current?.click()
  }

  const exportBookmarks = () => {
    const blob = new Blob([JSON.stringify(userBookmarks, null, 2)], {
      type: 'application/json',
    })
    const downloadURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadURL;
    link.download = "hackertabBookmarks";
    link.click();
    toast('Your bookmarks have been successfully exported', { theme: 'defaultToast' })
  }
  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const importData: BookmarkedPost[] = JSON.parse(reader.result as string);
        const validatedData = importData.filter(
          (data: BookmarkedPost) =>
            data.title &&
            data.url &&
            !userBookmarks.some((bm) => bm.title === data.title && bm.url === data.url))
        .map((data) => ({
            title: data.title,
            url: data.url,
            source: data.source || '',
            sourceType: data.sourceType || '',
        }));
        initState({
          userBookmarks: [...userBookmarks, ...validatedData],
        });
        toast('Your bookmarks have been successfully imported', { theme: 'defaultToast' })
      }
      reader.readAsText(file)
    }
  }


  return (
    <>
      <div className="btn-group">
        <div>
          <input
            type="file"
            id="file"
            ref={inputFile}
            accept="application/json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button className="notbtn btn" onClick={() => importBookmarks()}>
            Import
          </button>
        </div>
        <button className="notbtn btn" onClick={() => exportBookmarks()}>
            Export
        </button>
      </div>
      <SettingsContentLayout
        title="Bookmarks"
        description="Find all your bookmarks here. You can remove a bookmark by clicking on the remove icon.">
        <div className="bookmarks">
          {userBookmarks.map((bm) => (
            <BookmarkItem item={bm} key={bm.url} />
          ))}
        </div>
      </SettingsContentLayout>
    </>
  )
}
