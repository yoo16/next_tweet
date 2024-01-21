"use client"

import Link from 'next/link';
import Input from '@/app/components/Input';
import { RiLockPasswordFill } from "react-icons/ri";

import FormError from '@/app/components/FormError';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
// import { signIn } from 'next-auth/react';
import { signIn, getUser } from '@/app/services/UserService';
import { cookies } from "next/headers";
import { Button } from '@/components/ui/button';
export interface Error {
    auth: string;
}

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error>({ auth: "" });
    const router = useRouter();
    const { data: session } = useSession();

    const auth = async () => {
        const result = await signIn({ email, password, });
        console.log(result)
        if (result.access_token) {
            document.cookie = `access_token=${result.access_token}; path=/`;
            const user = await getUser(result.access_token);
            console.log(user)
            router.push('/');
        }
        // try {
        //     const result = await signIn("credentials", { email, password, });
        //     console.log(result)
        //     console.log('auth/login: auth()')
        // } catch (error) {
        //     setError({ auth: "Invalid Email or Password" });
        // }
    }

    return (
        <div className="mx-auto w-1/3">
            <h2 className="flex p-3 me-3 text-2xl justify-center">
                <RiLockPasswordFill className='mt-1 me-3' />
                Sign in
            </h2>

            <div>
                <Input
                    type="text"
                    value={email}
                    placeholder='Email'
                    onChange={setEmail}
                />
                <Input
                    type="password"
                    value={password}
                    placeholder='Password'
                    onChange={setPassword}
                />
                <FormError message={error.auth} />
            </div>

            <div>
                <Button onClick={auth}>auth</Button>
                <button
                    className="py-2 px-4 my-3 w-full bg-black hover:bg-gray-800
                    text-white rounded-lg"
                    onClick={auth}
                >Sign in</button>
                <Link
                    href='/auth/regist/'
                    className="p-2 my-1 flex justify-center text-gray-600
                    bg-gray-200 hover:bg-gray-300  rounded-lg"
                >Register</Link>
            </div>
        </div>
    );
}

export default LoginPage;