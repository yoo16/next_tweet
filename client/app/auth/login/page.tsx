"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormError from '@/app/components/FormError';
import Input from '@/app/components/Input';
import { RiLockPasswordFill } from "react-icons/ri";
import { signIn } from 'next-auth/react';

export interface Error {
    auth: string;
}

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error>({ auth: "" });
    const router = useRouter();

    const auth = async () => {
        await signIn("credentials", { email, password, });
        setError({ auth: "Invalid Email or Password" });
    }

    return (
        <div className="mx-auto w-1/3">
            <h2 className="flex p-3 me-3 text-2xl justify-center">
                <RiLockPasswordFill className='mt-1 me-3' />
                Sign in
            </h2>

            <div>
                <Input type="text" value={email} placeholder='Email' event={setEmail} />
                <Input type="password" value={password} placeholder='******' event={setPassword} />
                <FormError message={error.auth} />
            </div>

            <div>
                <button
                    className='w-full bg-black hover:bg-gray-800 text-white py-2 px-4 my-3 rounded-lg'
                    onClick={() => auth()}
                >Sign in</button>
                <Link
                    href='/auth/regist/'
                    className='flex justify-center p-2 my-1 text-gray-600 bg-gray-200 hover:bg-gray-300  rounded-lg'
                >Register</Link>
            </div>
        </div>
    );
}

export default LoginPage;