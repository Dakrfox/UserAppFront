"use client";
import Link from "next/link";
import { useState } from "react";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
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
          console.log(data);
        } else {
          // Handle login failure
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    return (
        <div className="login-container">
        <h2>Welcome to the Login Page</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Log In</button>
          <Link href="/Register">Register</Link>
        </form>
      </div>
    )
}
