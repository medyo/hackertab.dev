export const getAppVersion = (): string | undefined => {
  try {
    var manifestData = chrome.runtime.getManifest()
    return manifestData.version
  } catch (e) {
    return undefined
  }
}
