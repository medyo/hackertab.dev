import * as Sentry from '@sentry/react'
import { SENTRY_DSN } from 'src/config'
import { isDevelopment } from 'src/utils/Environment'

export const initSentry = () => {
  Sentry.init({
    dsn: SENTRY_DSN,
    sendDefaultPii: true,
    enabled: !isDevelopment(),
  })
}

export const identifySentryUser = (user: { [key: string]: any }) => {
  Sentry.setUser(user)
}
