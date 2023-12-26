"use client"

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from "@/app/components/auth/LoginForm";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const auth = async () => {
        const AUTH_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "auth";
        try {
            const data = {
                email: email,
                password: password,
            };
            console.log(data)
            const json = JSON.stringify(data);
            const response = await fetch(AUTH_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: json,
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                localStorage.setItem('access_token', result.access_token);
                router.push('/');
            } else {
                const error = await response.json();
                setErrorMessage('Emailまたはパスワードが間違っています');
            }
        } catch (error) {
            console.error('Failed to send data:', error);
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
            /><br />
            <input
                type="password"
                className='mb-3 border-2 border-gray-200 rounded w-full p-3 focus:outline-none focus:bg-white focus:border-blue-500'
                placeholder='password'
                onChange={(e) => { setPassword(e.target.value); }}
            />
            {errorMessage &&
                <div className='p-4 mb-3 bg-red-100 text-red-600'>
                    {errorMessage}
                </div>
            }
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