import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/Home-Component'
import Navigation from './routes/navigation/Navigation-component'
import SignIn from './routes/sign-in/Sign-in-component'

// shop component
const Shop = () => {
    return <h1>Welcome to Shop Page</h1>
}

// main component
function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="sign-in" element={<SignIn />} />
            </Route>
        </Routes>
    )
}

export default App
