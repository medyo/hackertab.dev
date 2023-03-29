// Blocking script to avoid the initial background flickering (switching from light to dark)
// https://stackoverflow.com/a/63033934/3495717

function isDNDModeActive(DNDDuration) {
  if (DNDDuration === 'always') {
    return true
  } else if (typeof DNDDuration === 'object') {
    return Boolean(DNDDuration.value && DNDDuration.countdown - new Date().getTime() > 0)
  } else {
    return false
  }
}
try {
  var state = JSON.parse(localStorage.preferences_storage).state
  var theme = state.theme || 'dark'
  document.documentElement.classList.add(theme)

  var DNDDuration = state.DNDDuration || 'never'
  if (isDNDModeActive(DNDDuration)) {
    document.documentElement.classList.add('dndState')
  }
} catch (e) {}
