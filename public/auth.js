const acceptedTypes = ['TOKEN_RECEIVED', 'ERROR_RECEIVED']
window.addEventListener('message', (event) => {
  if (acceptedTypes.includes(event.data.type)) {
    // Forward to content scripte
    window.postMessage(event.data, '*')
  }
})
