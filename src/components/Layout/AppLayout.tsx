import React from 'react'
import 'react-contexify/dist/ReactContexify.css'
import { Outlet } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import 'src/assets/App.css'
import { AuthModal, useAuth } from 'src/features/auth'
import { MarketingBanner } from 'src/features/MarketingBanner'
import { AuthProvider } from 'src/providers/AuthProvider'
import { Header } from './Header'

export const AppLayout = () => {
  const { isAuthModalOpen } = useAuth()

  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}
