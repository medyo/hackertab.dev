import { initializeApp } from 'firebase/app'
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
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
const googleAuthProvider = new GoogleAuthProvider()
const githubAuthProvider = new GithubAuthProvider()

export { firebaseAuth, githubAuthProvider, googleAuthProvider }
