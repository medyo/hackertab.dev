const script = document.createElement('script')
script.src = chrome.runtime.getURL('auth.js')
document.documentElement.appendChild(script)

// Listen for messages from the injected script
window.addEventListener('message', (event) => {
  if (event.source !== window || !event.data || event.data.type !== 'TOKEN_RECEIVED') {
    return
  }

  chrome.runtime.sendMessage({ ...event.data })
})
