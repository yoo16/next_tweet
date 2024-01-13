"use client";

import { useState, useEffect } from 'react';
import { registUser } from '@/app/services/UserService';
import { useRouter } from 'next/navigation';

export interface Error {
    name: string;
    email: string;
    password: string;
}

export interface PostUser {
    name: string;
    email: string;
    password: string;
}

function RegistPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error>({ name: "", email: "", password: "" });
    const router = useRouter();

    const regist = async () => {
        var result = await registUser({ name, email, password });
        if (result.error) {
            setError(result.error);
        } else {
            localStorage.setItem('access_token', result.access_token);
            router.push('/');
        }
    }

    return (
        <div className="mx-auto w-1/2">
            <h2 className="p-3 text-2xl text-center">Sign up</h2>
            <input
                type="text" value={name}
                className='border-2 border-gray-200 rounded w-full p-3 focus:outline-none focus:bg-white focus:border-blue-500'
                placeholder='Name'
                required
                onChange={(e) => { setName(e.target.value); }}
            />
            {/* エラーメッセージ */}
            <div className='mb-3 text-red-600'>{error.name}</div>
            <input
                type="text" value={email}
                className='border-2 border-gray-200 rounded w-full p-3 
                focus:outline-none focus:bg-white focus:border-blue-500'
                placeholder='Email'
                onChange={(e) => { setEmail(e.target.value); }}
            />
            {/* エラーメッセージ */}
            <div className='mb-3 text-red-600'>{error.email}</div>
            <input
                type="password"
                className='border-2 border-gray-200 rounded w-full p-3 
                focus:outline-none focus:bg-white focus:border-blue-500'
                placeholder='Password'
                onChange={(e) => { setPassword(e.target.value); }}
            />
            {/* エラーメッセージ */}
            <div className='mb-3 text-red-600'>{error.password}</div>
            <div>
                <button
                    className='w-full bg-blue-500 hover:bg-blue-400 
                    focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded-lg'
                    onClick={() => { regist(); }}
                >Sign up</button>
            </div>
        </div>
    );
}

export default RegistPage;