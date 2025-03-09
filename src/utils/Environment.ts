export const isProduction = (): boolean => {
  return import.meta.env.PROD
}

export const isDevelopment = (): boolean => {
  return import.meta.env.DEV
}

export const isWebOrExtensionVersion = (): 'web' | 'extension' => {
  const buildTarget = import.meta.env.VITE_BUILD_TARGET as 'web' | 'extension' | undefined
  return buildTarget || 'web'
}

export const getBrowserName = (): 'chrome' | 'firefox' | 'other' => {
  let userAgent = navigator.userAgent
  if (userAgent.match(/chrome|chromium|crios/i)) {
    return 'chrome'
  } else if (userAgent.match(/firefox|fxios/i)) {
    return 'firefox'
  } else {
    return 'other'
  }
}
