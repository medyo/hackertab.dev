const packageFile = require('../../package.json')

export const mergeMultipleDataSources = async (promises, maxCount) => {
  let promisesRequests = await Promise.allSettled(promises)
  let promisesValues = promisesRequests
    .map((res) => {
      let value = res.value
      if (res.status === 'rejected') {
        value = []
      }
      return value
    })
    .filter(Boolean)
    .filter((value) => value.length > 1)
  const nbrTags = promisesValues.length
  let minLength = Math.min(maxCount, ...promisesValues.map((v) => v.length))
  const data = []
  for (let index = 0; index < minLength; index++) {
    for (let i = 0; i < nbrTags; i++) {
      data.push(promisesValues[i][index])
    }
  }
  return data
}

export const getBaseApi = (fallback) => {
  return process.env.NODE_ENV === 'production' ? packageFile.proxy : fallback
}
