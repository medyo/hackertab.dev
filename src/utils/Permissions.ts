import { getBrowserName } from './Environment'

// Check host permissions before allowing the user to sign in with a provider.
// as Firefox may block the Signin on v3 if the extension does not have host permissions.
export const checkHostPermissions = async () => {
  if (getBrowserName() !== 'firefox') {
    return true
  }

  const HOST_PERMISSIONS = chrome.runtime.getManifest().content_scripts || []
  const requiredHosts = HOST_PERMISSIONS.flatMap((permission) => {
    return permission.matches || []
  })

  return await chrome.permissions.contains({ origins: requiredHosts })
}

export const requestHostPermissions = async () => {
  if (getBrowserName() !== 'firefox') {
    return true
  }
  const HOST_PERMISSIONS = chrome.runtime.getManifest().content_scripts || []
  const requiredHosts = HOST_PERMISSIONS.flatMap((permission) => {
    return permission.matches || []
  })

  return await chrome.permissions.request({ origins: requiredHosts })
}
