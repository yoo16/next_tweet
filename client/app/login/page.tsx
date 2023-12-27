"use client"

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';

export interface Error {
    auth: string;
}

//TODO: service
export const authUser = async (email: string, password: string) => {
    try {
        const AUTH_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "auth";
        const response = await fetch(AUTH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ email: email, password: password, }),
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.error('Failed to send data:', error);
    }
}

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error>({ auth: "" });
    const router = useRouter();

    const auth = async () => {
        const result = await authUser(email, password);
        if (result.error) {
            setError(result.error);
        } else {
            localStorage.setItem('access_token', result.access_token);
            router.push('/');
        }
    }

    return (
        <div className="mx-auto w-1/2">
            <h2 className="p-3 text-2xl text-center">Sign in</h2>
            <input
                type="text"
                className='mb-3 border-2 border-gray-200 rounded w-full p-3 focus:outline-none focus:bg-white focus:border-blue-500'
                placeholder='email'
                onChange={(e) => { setEmail(e.target.value); }}
            />
            <input
                type="password"
                className='mb-3 border-2 border-gray-200 rounded w-full p-3 focus:outline-none focus:bg-white focus:border-blue-500'
                placeholder='password'
                onChange={(e) => { setPassword(e.target.value); }}
            />
            <div className='mb-3 text-red-600'>{error.auth}</div>
            <div>
                <button
                    className='w-full bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded-lg'
                    onClick={() => { auth(); }}
                >Login</button>
            </div>
        </div>
    );
}

export default LoginPage;