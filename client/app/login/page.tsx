"use client"

import { useState, useEffect } from 'react';


const LoginPage = () => {
    const AUTH_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "auth";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const auth = async () => {
        try {
            const data = {
                email: email,
                password: password
            };
            const json = JSON.stringify(data);
            const response = await fetch(AUTH_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: json,
            });
            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('access_token', result.access_token);
                const accessToken = localStorage.getItem('access_token');
                console.log('access token:', accessToken);
            } else {
                const error = await response.json();
                setErrorMessage('Emailまたはパスワードが間違っています');
                console.log(error);
            }
        } catch (error) {
            console.error('Failed to send data:', error);
        }
    }

    return (
        <div className="mx-auto w-1/2">
            <input
                type="text"
                className='border-2 border-gray-200 rounded w-full p-3 focus:outline-none focus:bg-white focus:border-blue-500 m-3'
                placeholder='email'
                onChange={(e) => { setEmail(e.target.value); }}
            /><br />
            <input
                type="password"
                className="border-2 border-gray-200 rounded w-full p-3 focus:outline-none focus:bg-white focus:border-blue-500 m-3"
                placeholder='password'
                onChange={(e) => { setPassword(e.target.value); }}
            />
            <div className="p-4 text-red-600">
                {errorMessage}
            </div>
            <div>
                <button
                    className="w-full bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded-lg m-3"
                    onClick={() => { auth(); }}
                >Login</button>
            </div>
        </div>
    );
}

export default LoginPage;