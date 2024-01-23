"use client";

import { FaUser } from "react-icons/fa";
import Input from '@/app/components/Input';
import FormError from '@/app/components/FormError';
import { registUser, updateAccessToken } from '@/app/services/UserService';
import { useContext, useState } from 'react';
import UserContext from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import ClickButton from "@/app/components/ClickButton";
import LinkButton from "@/app/components/LinkButton";

interface RegistError {
    name: string;
    email: string;
    password: string;
}

function RegistPage() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<RegistError>({ name: "", email: "", password: "" });
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
            if (user && response) {
                setUser(user);
                router.replace('/');
            }
        }
    }

    const isDisabled = () => !(name && email && password);

    return (
        <div className="mx-auto w-1/3">
            <h1 className="flex p-3 me-3 text-2xl justify-center">
                <FaUser className='mt-1 me-3' />
                Register
            </h1>

            <div>
                <Input 
                type="text" 
                value={name} 
                placeholder="Your Name" 
                onChange={setName} />
                <FormError message={error.name} />

                <Input 
                type="email" 
                value={email} 
                placeholder="Email" 
                onChange={setEmail} />
                <FormError message={error.email} />

                <Input 
                type="password" 
                value={password} 
                placeholder="Password" 
                onChange={setPassword} />
                <FormError message={error.password} />
            </div>

            <div>
                <ClickButton label="Sign up" onClick={regist} disabled={isDisabled()} />
                <LinkButton label="Sign in" href="/auth/login" />
            </div>
        </div>
    );
}

export default RegistPage;