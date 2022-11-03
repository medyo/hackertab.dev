import React, { useState, useEffect } from 'react'
import { migrateToNewStorage } from 'src/utils/StorageMigration'

export default function AppWrapper({ children }) {
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    try {
      migrateToNewStorage()
    } catch {
    } finally {
      setAppReady(true)
    }
  }, [])

  return appReady && children
}
