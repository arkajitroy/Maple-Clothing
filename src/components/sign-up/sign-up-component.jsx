import React, { useState } from 'react'
import {
    createAuthEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase-utils'

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
            <h1>Sign Up with your Email</h1>
            <form onSubmit={handleSubmit}>
                <label>Usename</label>
                <input
                    name="displayName"
                    value={displayName}
                    type="text"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    required
                />
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Email Address"
                    onChange={handleChange}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm your password"
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />

                <button type="submit" onClick={handleSubmit}>
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUpForm
