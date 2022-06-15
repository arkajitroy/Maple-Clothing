import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDMrwVfpn90y9so1moEvbNTvV6n1FHspYg',
    authDomain: 'maple-clothing-project-1bdb5.firebaseapp.com',
    projectId: 'maple-clothing-project-1bdb5',
    storageBucket: 'maple-clothing-project-1bdb5.appspot.com',
    messagingSenderId: '1028409718936',
    appId: '1:1028409718936:web:8b3119557fbc03edd2b8ed',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// authentication
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

// database
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    // document reference
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapShot = await getDoc(userDocRef)
    console.log(userSnapShot)
    console.log(userSnapShot.exists())

    // creating user document
    // if user-doc doesn't exist -- we will set the datas
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            })
        } catch (err) {
            console.log('Error on creation -- ', err.message)
        }
    }
}
