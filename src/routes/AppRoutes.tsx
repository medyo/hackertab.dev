import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from 'src/components/Layout/AppLayout'
import { SettingsLayout } from 'src/components/Layout/SettingsLayout'
import { lazyImport } from 'src/utils/lazyImport'

const { App } = lazyImport(() => import('src/App'), 'App')
const { GeneralSettings } = lazyImport(() => import('src/features/settings'), 'GeneralSettings')
const { SourceSettings } = lazyImport(() => import('src/features/settings'), 'SourceSettings')
const { SearchEngineSettings } = lazyImport(
  () => import('src/features/settings'),
  'SearchEngineSettings'
)
const { BookmarkSettings } = lazyImport(() => import('src/features/settings'), 'BookmarkSettings')
const { TopicSettings } = lazyImport(() => import('src/features/settings'), 'TopicSettings')
const { ProfileSettings } = lazyImport(() => import('src/features/settings'), 'ProfileSettings')

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/settings" element={<SettingsLayout />}>
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="bookmarks" element={<BookmarkSettings />} />
            <Route path="topics" element={<TopicSettings />} />
            <Route path="sources" element={<SourceSettings />} />
            <Route path="search-engine" element={<SearchEngineSettings />} />
            <Route path="general" element={<GeneralSettings />} />
          </Route>
          <Route path="*" index element={<App />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
