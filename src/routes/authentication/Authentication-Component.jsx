import React, { useEffect } from 'react'

import SignUpForm from '../../components/sign-up/sign-up-component'
import SignInForm from '../../components/sign-in/Sign-in-component'
import './authentication-styles.scss'

const Authentication = () => {
    return (
        <div className="authentication-container">
            <SignInForm id="sign-in-form" />
            <SignUpForm id="sign-up-form" />
        </div>
    )
}

export default Authentication
