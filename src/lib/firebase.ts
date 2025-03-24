import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { FIREBASE_API_KEY } from 'src/config'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
}

if (!FIREBASE_API_KEY) {
  console.warn('Missing Firebase api Key')
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(app)
export { firebaseAuth }
