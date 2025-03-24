const uninstallUrl = `https://hackertab.dev/uninstall.html`
if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL(uninstallUrl)
}
