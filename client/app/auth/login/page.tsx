"use client"

import Link from 'next/link';
import Input from '@/app/components/Input';
import { RiLockPasswordFill } from "react-icons/ri";

import FormError from '@/app/components/FormError';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, signIn, updateToken } from '@/app/services/UserService';
import { Button } from '@/components/ui/button';
import UserContext from '@/app/context/UserContext';
// import { useSession } from 'next-auth/react';
// import { signIn } from 'next-auth/react';
export interface Error {
    auth: string;
}

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error>({ auth: "" });
    const router = useRouter();
    const { setUser } = useContext(UserContext);
    // const { data: session } = useSession();

    const auth = async () => {
        const result = await signIn({ email, password, });
        const token = result?.access_token;
        if (!result || result.error) {
            setError(result?.error || { auth: "internal error" });
        } else if (token) {
            const user = await getUser(token)
            setUser(user);
            const response = await updateToken(token);
            if (response) router.push('/');
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
                <Button onClick={auth} className="w-full">Sign in</Button>
                <Link
                    href='/auth/regist/'
                    className="p-2 my-1 flex justify-center 
                    text-gray-600
                    bg-gray-200 hover:bg-gray-300 rounded-lg"
                >Register</Link>
            </div>
        </div>
    );
}

export default LoginPage;