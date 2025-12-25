export const addHttpsProtocol = (url: string): string => {
  url = decodeURIComponent(url)
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    url = 'https:' + url
  }
  return url
}

export const isValidURL = (str: string): boolean => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,})' + // domain name
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(str)
}

export const encode = (value: string) => encodeURIComponent(value)
