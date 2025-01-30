import { initializeApp } from 'firebase/app'
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'

// TODO This is a temporary firebase project config, to be changed later.
const firebaseConfig = {
  apiKey: 'AIzaSyCpD2SbQnCCDjmAPasQ8q5jPcxf5lQLwYI',
  authDomain: 'hackertab-418813.firebaseapp.com',
  projectId: 'hackertab-418813',
  storageBucket: 'hackertab-418813.firebasestorage.app',
  messagingSenderId: '249160525821',
  appId: '1:249160525821:web:e729de3eadc14d2242db94',
  measurementId: 'G-NTMXFLMF00',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export { auth, githubProvider, googleProvider }
