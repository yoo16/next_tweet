"use client"

import Input from '@/app/components/Input';
import { RiLockPasswordFill } from "react-icons/ri";

import FormError from '@/app/components/FormError';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, signIn, updateAccessToken } from '@/app/services/UserService';
import UserContext from '@/app/context/UserContext';
import LinkButton from '@/app/components/LinkButton';
import ClickButton from '@/app/components/ClickButton';
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
        const token = result.access_token;
        if (!result || result.error) {
            setError(result?.error || { auth: "internal error" });
        } else {
            if (token) {
                await updateAccessToken(token);
                const user = await getUser(token)
                setUser(user);
                router.replace('/');
            }
        }
        // try {
        //     const result = await signIn("credentials", { email, password, });
        //     console.log(result)
        //     console.log('auth/login: auth()')
        // } catch (error) {
        //     setError({ auth: "Invalid Email or Password" });
        // }
    }

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