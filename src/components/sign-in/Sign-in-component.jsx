import React, { useState } from 'react'
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInEmailAndPassword,
} from '../../utils/firebase/firebase-utils'

import FormInput from '../form-input/Form-input-component'
import './sign-in-styles.scss'
import Button from '../button/Button-component'

// this object where we are storeing all the datas from the form
const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    console.log(formFields)

    const resetForm = () => {
        setFormFields(defaultFormFields)
    }

    const SignInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const res = await signInEmailAndPassword(email, password)
            console.log(res)
            resetForm()
        } catch (err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    alert('Incorrect Password !!')
                    break
                case 'auth/user-not-found':
                    alert('User does not exist')
                    break
                default:
                    console.log('Error -> ', err.message)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div>
            <div className="sign-in-container">
                <h2>Welcome Again</h2>
                <span>Please sign with your account</span>
                <form onSubmit={handleSubmit}>
                    {/* <label>Email</label> */}
                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    {/* <label>Password</label> */}
                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />

                    <div className="buttons-container">
                        <Button id="btn" type="submit">
                            Sign In
                        </Button>
                        <Button
                            id="btn"
                            type="button"
                            buttonType="google"
                            onClick={SignInWithGoogle}
                        >
                            Google Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignInForm
