import React, { useState } from 'react'
import {
    createAuthEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase-utils'

import FormInput from '../../components/form-input/Form-input-component'
import './sign-up-styles.scss'
import Button from '../../components/button/Button-component'

// this object where we are storeing all the datas from the form
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    console.log(formFields)

    const resetForm = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert('Password do not match')
            return
        }
        try {
            const { user } = await createAuthEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, { displayName })
            console.log(user)
            resetForm()
        } catch (err) {
            if (err.code == 'auth/email-already-in-use') {
                alert('Cannot create user, Email already exist')
            }
            console.log('User Creation Inturupted -> ', err)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div>
            <div className="sign-up-container">
                <h2>Don't have an account ?</h2>
                <span>Sign Up with your Email</span>
                <form onSubmit={handleSubmit}>
                    {/* <label>Usename</label> */}
                    <FormInput
                        label="Username"
                        name="displayName"
                        type="text"
                        value={displayName}
                        onChange={handleChange}
                        required
                    />
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
                    {/* <label>Confirm Password</label> */}
                    <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />

                    <Button id="btn" type="submit" onClick={handleSubmit}>
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm
