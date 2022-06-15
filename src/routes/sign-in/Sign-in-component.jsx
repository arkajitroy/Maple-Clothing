import React from 'react'
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase-utils'

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Welcome to the Login Page</h1>
            <button onClick={logGoogleUser}>Sign In</button>
        </div>
    )
}

export default SignIn
