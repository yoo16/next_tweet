"use client";

import { FaUser } from "react-icons/fa";
import Link from 'next/link';
import Input from '@/app/components/Input';
import FormError from '@/app/components/FormError';
import { registUser, updateAccessToken } from '@/app/services/UserService';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import UserContext from "@/app/context/UserContext";

interface RegistError {
    name: string;
    email: string;
    password: string;
}

function RegistPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<RegistError>({ name, email, password });
    const router = useRouter();
    const { setUser } = useContext(UserContext);

    const regist = async () => {
        const result = await registUser({ name, email, password });
        if (result.error) {
            setError(result.error);
        } else {
            const user = result?.user;
            const response = await updateAccessToken(user?.accessToken);
            // console.log("regist:", user)
            // console.log("regist:", response)
            if (response) {
                setUser(user);
                router.push('/');
            }
        }
    }

    return (
        <div className="mx-auto w-1/3">
            <h1 className="flex p-3 me-3 text-2xl justify-center">
                <FaUser className='mt-1 me-3' />
                Register
            </h1>

            <div>
                <Input type="text" value={name} placeholder="Your Name" onChange={setName} />
                <FormError message={error.name} />

                <Input type="email" value={email} placeholder="Email" onChange={setEmail} />
                <FormError message={error.email} />

                <Input type="password" value={password} placeholder="Password" onChange={setPassword} />
                <FormError message={error.password} />
            </div>

            <div>
                <button
                    className="py-2 px-4 my-3 w-full 
                    bg-black hover:bg-gray-800 
                    focus:shadow-outline focus:outline-none 
                    text-white 
                    rounded-lg"
                    onClick={regist}
                >Sign up</button>

                <Link
                    href="/auth/login/"
                    className="flex justify-center 
                    p-2 my-1 
                    text-gray-600 bg-gray-200 hover:bg-gray-300 
                    rounded-lg"
                >Sign in</Link>
            </div>
        </div>
    );
}

export default RegistPage;