const script = document.createElement('script')
script.src = chrome.runtime.getURL('auth.js')
document.documentElement.appendChild(script)
const acceptedTypes = ['TOKEN_RECEIVED', 'ERROR_RECEIVED']

// Listen for messages from the injected script
window.addEventListener('message', (event) => {
  if (event.source !== window || !event.data || !acceptedTypes.includes(event.data.type)) {
    return
  }
  chrome.runtime.sendMessage({ ...event.data })
})
