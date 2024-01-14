"use client";

import { useState } from 'react';
import { registUser } from '@/app/services/UserService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormError from '@/app/components/FormError';
import Input from '@/app/components/Input';
import { FaUser } from "react-icons/fa";

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
    const [error, setError] = useState<Error>({ name, email, password });
    const router = useRouter();

    const regist = async () => {
        var result = await registUser({ name, email, password });
        if (result.error) {
            setError(result.error);
        } else {
            router.push('/');
        }
    }

    return (
        <div className="mx-auto w-1/3">
            <h2 className="flex p-3 me-3 text-2xl justify-center">
                <FaUser className='mt-1 me-3' />
                Sign up
            </h2>
            <Input type="text" value={name} placeholder="Your Name" event={setName} />
            <FormError message={error.name} />

            <Input type="text" value={email} placeholder="Email" event={setEmail} />
            <FormError message={error.email} />

            <Input type="password" value={password} placeholder="******" event={setPassword} />
            <FormError message={error.password} />

            <div>
                <button
                    className='w-full bg-black hover:bg-gray-800 focus:shadow-outline focus:outline-none text-white py-2 px-4 my-3 rounded-lg'
                    onClick={() => { regist() }}
                >Sign up</button>

                <Link
                    href='/auth/login/'
                    className='flex justify-center p-2 my-1 text-gray-600 bg-gray-200 hover:bg-gray-300  rounded-lg'
                >Sign in</Link>
            </div>
        </div>
    );
}

export default RegistPage;