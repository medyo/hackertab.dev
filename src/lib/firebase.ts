import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth/web-extension'
import { FIREBASE_API_KEY } from 'src/config'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
}

let firebaseAuth: any

if (!FIREBASE_API_KEY) {
  console.warn('Missing Firebase api Key, Auth features will not work')
  firebaseAuth = {
    onAuthStateChanged: (callback: any) => {
      callback(null)
      return () => {}
    },
    signOut: () => Promise.resolve(),
  }
} else {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  firebaseAuth = getAuth(app)
}

export { firebaseAuth }
