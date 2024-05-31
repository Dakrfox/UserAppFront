"use client";
import Link from 'next/link';
import React, { useState } from 'react'

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');   
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, username, password);   
    }
    return (
        <div>
            <h2>Welcome to the Login Page</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="username">Username:</label>
                <input type="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
                <Link href="/Register">I have an already account</Link>
            </form>
        </div>
    )
}