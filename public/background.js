/*chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({ url: "chrome://newtab" });
}
);*/

const uninstallUrl = `https://hackertab.dev/uninstall.html`;
if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL(uninstallUrl);
}