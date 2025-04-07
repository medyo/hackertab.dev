const uninstallUrl = `https://hackertab.dev/uninstall.html`
if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL(uninstallUrl)
}

chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: 'index.html', selected: true })
})
