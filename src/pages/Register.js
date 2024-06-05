"use client";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const login = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          if (response.ok) {
            const data = await response.json();
            // Handle successful login
            const token = data.token;
  
            localStorage.setItem('authToken', token);
            console.log('Token stored in localStorage:', token);
            router.push('/User');
  
          } else {
            // Handle login failure
            console.error('Login failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, username, password);
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            })
            console.log(response.ok)
            if (response.ok) {
                login(e);
            } else {
                console.error('Error:', response.statusText);
            }

        } catch (error) {
            console.error('Error:', error);
        }
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
                <Link href="/Login">I have already an account</Link>
            </form>
        </div>
    )
}