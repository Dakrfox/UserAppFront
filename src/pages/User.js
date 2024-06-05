"use client";
import { useRouter, Redirect } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'next/link'; // Import the Link component
import jwt from 'jsonwebtoken';
import { UserContext } from '../context/UserContext';

export default function User() {
    const { user, setUser } = useContext(UserContext);
    const secretKey = 'miClaveSecreta';
    const Router = useRouter();
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
        const token = window.localStorage.getItem('authToken');
        try {
            const decoded = jwt.verify(token, secretKey);
            
            
            const userId = decoded.userId;
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/users/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);
                        setUser(data);
                    } else {
                        console.error('Error:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            fetchData()
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.error('Token expired');
                { Router.push('/Login') }
            } else {
                console.error('Invalid token:', error.message);
                { Router.push('/Login') }
                // Handle other token errors (e.g., redirect to login)
            }
        }
    }, []);

   

    const onhandleLogout = () => {
        localStorage.removeItem('authToken');
        Router.push('/Login');
    }

    console.log(user)
    return (
        <div>
            <h1>User aPanel</h1>
            <p>User Data: {JSON.stringify(userData)}</p>

            <button onClick={onhandleLogout}>Log Out</button>
        </div>
    )
}