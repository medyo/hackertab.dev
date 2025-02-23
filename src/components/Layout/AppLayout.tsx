import React, { useEffect } from 'react'
import 'react-contexify/dist/ReactContexify.css'
import { Outlet } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import 'src/assets/App.css'
import { AuthModal, AuthStore, useAuth } from 'src/features/auth'
import { usePostHit } from 'src/features/hits'
import { MarketingBanner } from 'src/features/MarketingBanner'
import { Header } from './Header'

export const AppLayout = () => {
  const { isAuthModalOpen } = useAuth()
  const { setStreak } = AuthStore()
  const postHitMutation = usePostHit()

  useEffect(() => {
    postHitMutation.mutateAsync({ data: { type: 'visit' } }).then((data) => {
      setStreak(data.streak)
    })
  }, [])

  return (
    <>
      <MarketingBanner />

      <div className="App">
        <Header />
        <AuthModal showAuth={isAuthModalOpen} />
        <React.Suspense
          fallback={
            <div className="appLoading">
              <BeatLoader color={'#A9B2BD'} loading={true} size={15} />
            </div>
          }>
          <Outlet />
        </React.Suspense>
      </div>
    </>
  )
}
