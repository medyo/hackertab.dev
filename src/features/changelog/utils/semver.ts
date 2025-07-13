export const isVersionLowerOrEqual = (v1: string, v2: string) => {
  const a = v1.replace(/^v/, '').split('.').map(Number)
  const b = v2.replace(/^v/, '').split('.').map(Number)
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] || 0) - (b[i] || 0)
    if (diff < 0) return true // v1 < v2
    if (diff > 0) return false // v1 > v2
  }
  return true // equal
}
