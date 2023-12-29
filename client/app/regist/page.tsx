"use client";

import { useState } from 'react';
import RegistUser from '@/app/services/RegistUser';
import { useRouter } from 'next/navigation';

export interface Error {
    name: string;
    email: string;
    password: string;
}

function RegistPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error>({ name: name, email: email, password: password });
    const router = useRouter();

    const regist = async () => {
        var result = await RegistUser(name, email, password);
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
                type="text"
                className='border-2 border-gray-200 rounded w-full p-3 focus:outline-none focus:bg-white focus:border-blue-500'
                placeholder='name'
                onChange={(e) => { setName(e.target.value); }}
            />
            <div className='mb-3 text-red-600'>{error.name}</div>
            <input
                type="text"
                className='border-2 border-gray-200 rounded w-full p-3 focus:outline-none focus:bg-white focus:border-blue-500'
                placeholder='email'
                onChange={(e) => { setEmail(e.target.value); }}
            />
            <div className='mb-3 text-red-600'>{error.email}</div>
            <input
                type="password"
                className='border-2 border-gray-200 rounded w-full p-3 focus:outline-none focus:bg-white focus:border-blue-500'
                placeholder='password'
                onChange={(e) => { setPassword(e.target.value); }}
            />
            <div className='mb-3 text-red-600'>{error.password}</div>
            <div>
                <button
                    className='w-full bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded-lg'
                    onClick={() => { regist(); }}
                >Sign up</button>
            </div>
        </div>
    );
}

export default RegistPage;