"use client";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useContext, useState } from "react";
import { UserContext } from '../context/UserContext';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { user } = useContext(UserContext);
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
  console.log(user)
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
