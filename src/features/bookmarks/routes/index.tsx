import { Route, Routes } from 'react-router-dom'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout/SettingsContentLayout'
import { useBookmarks } from 'src/stores/bookmarks'

const Bookmarks = () => {
  const { userBookmarks } = useBookmarks()
  return (
    <SettingsContentLayout
      title="Bookmarks"
      description="Select the programming languages you use the most or interested in keeping uptodate with">
      <div>
        {userBookmarks.map((bm) => (
          <div key={bm.url}>
            <h3>{bm.title}</h3>
            <p>{bm.url}</p>
          </div>
        ))}
      </div>
    </SettingsContentLayout>
  )
}

export const BookmarksRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Bookmarks />} />
    </Routes>
  )
}
