import { useUserPreferences } from 'src/stores/preferences'
import { lazyImport } from 'src/utils/lazyImport'
const { Feed } = lazyImport(() => import('src/features/feed'), 'Feed')
const { CardsLayout } = lazyImport(() => import('./CardsLayout'), 'CardsLayout')

export const AppContentLayout = () => {
  const { layout } = useUserPreferences()
  return (
    <>
      <main className="AppContent">{layout === 'grid' ? <Feed /> : <CardsLayout />}</main>
    </>
  )
}
