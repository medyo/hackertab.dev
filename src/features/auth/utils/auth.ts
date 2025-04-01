import { firebaseAuth } from 'src/lib/firebase'

export const getUserToken = async () => {
  return new Promise((resolve, _) => {
    const unsub = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        resolve(token)
      } else {
        resolve(null)
      }
      unsub()
    })
  })
}
