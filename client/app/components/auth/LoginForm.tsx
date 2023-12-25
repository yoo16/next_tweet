"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

interface Credentials {
    email: string;
    password: string;
};

export const LoginForm = async () => {
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: "",
    });
    // const { toast } = useToast();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setCredentials({ ...credentials, [id]: value });
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            console.log(credentials)
            const res = await signIn("credentials", {
                email: credentials.email,
                password: credentials.password,
                callbackUrl: "/",
            });
            console.log(res)
            if (res?.error) {
                // toast({
                //     variant: "destructive",
                //     title: "ログインに失敗しました",
                //     description: res.error,
                // });
            }
        } catch (error) {
            var msg = "エラー";
            if (error instanceof Error) {
                msg = error.message;
            }
            // toast({
            //     variant: "destructive",
            //     title: "ログインに失敗しました",
            //     description: msg,
            // });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto w-1/2">
            <h1 className="text-center text-2xl m-4 mx-auto">ログイン</h1>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="p-3"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => handleInput(e)}
                        value={credentials.email}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="p-3"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => handleInput(e)}
                        value={credentials.password}
                    />
                </div>
                <div>
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded-lg"
                        onClick={handleLogin}
                    >Login</button>
                </div>
            </div>
        </div>
    );
};