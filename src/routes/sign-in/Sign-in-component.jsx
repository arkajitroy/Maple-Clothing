import React, { useEffect } from 'react'
import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase-utils'
import { getRedirectResult } from 'firebase/auth'
import SignUpForm from '../../components/sign-up/sign-up-component'

const SignIn = () => {
    useEffect(async () => {
        const res = await getRedirectResult(auth)
        console.log(res)
        if (res) {
            const userDocRef = await createUserDocumentFromAuth(res.user)
        }
    }, [])

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Welcome to the Login Page</h1>
            <button onClick={logGoogleUser}>Sign In</button>
            <button onClick={signInWithGoogleRedirect}>
                Sign In with Google Redirect
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn
