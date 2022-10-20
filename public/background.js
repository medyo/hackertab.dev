/*chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({ url: "chrome://newtab" });
}
);*/

const uninstallUrl = `https://hackertab.dev/uninstall.html`;
var anonymousUserId = window.localStorage.getItem('hackerTabAnalyticsId')

if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL(`${uninstallUrl}?u=${anonymousUserId}`)
}