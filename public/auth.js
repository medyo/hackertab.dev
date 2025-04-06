const acceptedTypes = ['TOKEN_RECEIVED', 'ERROR_RECEIVED']
window.addEventListener('message', (event) => {
  console.log('Received message from content script:', event.data)
  if (acceptedTypes.includes(event.data.type)) {
    // Forward to content scripte
    window.postMessage(event.data, '*')
  }
})
