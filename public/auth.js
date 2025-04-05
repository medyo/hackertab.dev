window.addEventListener('message', (event) => {
  if (event.data.type === 'TOKEN_RECEIVED' || event.data.type === 'ERROR_RECEIVED') {
    // Forward to content script
    window.postMessage(event.data, '*')
  }
})
