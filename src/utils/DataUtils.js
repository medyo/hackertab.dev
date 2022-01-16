export const mergeMultipleDataSources = async (promises, maxCount) => {
  let values = await Promise.all(promises)
  values = values.filter((value) => value && value.length > 0)
  const nbrTags = values.length
  let minLength = Math.min(maxCount, ...values.map((v) => v.length))
  const data = []
  for (let index = 0; index < minLength; index++) {
    for (let i = 0; i < nbrTags; i++) {
      data.push(values[i][index])
    }
  }
  return data
}
