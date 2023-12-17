import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from 'src/components/Layout/AppLayout'
import { SettingsLayout } from 'src/components/Layout/SettingsLayout'
import { lazyImport } from 'src/utils/lazyImport'

const { App } = lazyImport(() => import('src/App'), 'App')
const { GeneralSettings } = lazyImport(() => import('src/features/settings'), 'GeneralSettings')
const { SourceSettings } = lazyImport(() => import('src/features/settings'), 'SourceSettings')
const { BookmarkSettings } = lazyImport(() => import('src/features/settings'), 'BookmarkSettings')
const { TopicSettings } = lazyImport(() => import('src/features/settings'), 'TopicSettings')

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/settings" element={<SettingsLayout />}>
            <Route path="bookmarks" element={<BookmarkSettings />} />
            <Route path="topics" element={<TopicSettings />} />
            <Route path="sources" element={<SourceSettings />} />
            <Route path="general" element={<GeneralSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
