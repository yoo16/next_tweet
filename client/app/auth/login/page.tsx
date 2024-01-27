"use client"

import { RiLockPasswordFill } from "react-icons/ri";

import Input from '@/app/components/Input';
import FormError from '@/app/components/FormError';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken, getUser, signIn } from '@/app/services/UserService';

import UserContext from '@/app/context/UserContext';
import LinkButton from '@/app/components/LinkButton';
import ClickButton from '@/app/components/ClickButton';
// import { useSession } from 'next-auth/react';
// import { signIn } from 'next-auth/react';
export interface Error {
    auth: string;
}

const LoginPage = () => {
    const router = useRouter();
    const token = getAccessToken();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error>({ auth: "" });
    const { setUser } = useContext(UserContext);
    // const { data: session } = useSession();

    const checkUser = async (token: string) => {
        const user = await getUser(token);
        setUser(user);
        return (user?.accessToken) && router.replace('/');
    }

    const auth = async () => {
        const result = await signIn({ email, password, });
        if (result?.error) {
            setError(result.error)
        } else {
            checkUser(result?.access_token);
        }
    }

    useEffect(() => {
        (async () => {
            console.log("user/login", token)
            if (!token) return;
            checkUser(token);
        })
    }, [token])

    const isDisabled = () => !(email && password);

    return (
        <div className="mx-auto w-1/3">
            <h1 className="flex p-3 me-3 text-2xl justify-center">
                <RiLockPasswordFill className='mt-1 me-3' />
                Sign in
            </h1>

            <div>
                <Input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={setEmail}
                />
                <Input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={setPassword}
                />
                <FormError message={error.auth} />
            </div>

            <div>
                <ClickButton label="Sign in" onClick={auth} disabled={isDisabled()} />
                <LinkButton label="Register" href="/auth/regist/" />
            </div>
        </div>
    );
}

export default LoginPage;