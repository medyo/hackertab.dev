window.addEventListener('message', (event) => {
  if (event.data.type === 'TOKEN_RECEIVED') {
    // Forward to content script
    window.postMessage(event.data, '*')
  }
})
