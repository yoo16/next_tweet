import { signIn } from "@/app/services/UserService";
import { useRouter } from "next/router";
import { useState } from "react";

export interface Error {
    auth: string;
}

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error>({ auth: "" });
    const router = useRouter();

    const auth = async () => {
        const result = await signIn({ email, password });
        if (result.error) {
            setError(result.error);
        } else {
            router.push('/');
        }
    }
    return (
        <div className="mx-auto w-1/2">
            <h2 className="p-3 text-2xl text-center">Sign in</h2>
            <input
                type="text"
                className='mb-3 border-2 border-gray-200 rounded w-full p-3 focus:outline-none focus:bg-white focus:border-blue-500'
                placeholder='Email'
                onChange={(e) => { setEmail(e.target.value); }}
            />
            <input
                type="password"
                className='mb-3 border-2 border-gray-200 rounded w-full p-3 focus:outline-none focus:bg-white focus:border-blue-500'
                placeholder='Password'
                onChange={(e) => { setPassword(e.target.value); }}
            />
            <div className='mb-3 text-red-600'>{error.auth}</div>
            <div>
                <button
                    className='w-full bg-black hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded-lg'
                    onClick={auth}
                >Sign in</button>
            </div>
        </div>
    );
}

export default LoginForm;