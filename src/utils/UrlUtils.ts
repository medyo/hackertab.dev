export const addHttpsProtocol = (url: string): string => {
  url = decodeURIComponent(url)
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    url = 'https:' + url
  }
  return url
}