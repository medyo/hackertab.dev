// Blocking script to avoid the initial background flickering (switching from light to dark)
// https://stackoverflow.com/a/63033934/3495717
try {
  var theme = JSON.parse(localStorage.hackerTabPrefs).theme || 'dark'
  document.documentElement.classList.add(theme)
} catch (e) {
  console.log(e)
}
