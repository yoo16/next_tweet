"use client"

import { useState, useEffect } from 'react';

const LoginPage = () => {
    const AUTH_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "login/auth";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = async () => {
        try {
            const data = {
                email: email,
                password: password
            };
            const response = await fetch(AUTH_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error('Failed to send data:', error);
        }
    }

    return (
        <div>
            <input
                type="text"
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm'
                placeholder='email'
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            /><br />
            <input
                type="text"
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm'
                placeholder='password'
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <div>
                <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-3"
                    onClick={() => {
                        auth();
                    }}
                >送信</button>
            </div>
        </div>
    );
}

export default LoginPage;