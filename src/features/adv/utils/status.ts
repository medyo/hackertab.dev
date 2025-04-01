export const verifyAdvStatus = async () => {
  try {
    const resp = await fetch('https://srv.buysellads.com', {
      mode: 'no-cors',
    })
    await resp.text()
    return false
  } catch (e) {
    return true
  }
}
