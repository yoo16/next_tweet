"use client"

import React, { useEffect, useState } from "react";
import UserContext, { UserContextType } from "../context/UserContext";
import { User, initialUser } from "../models/User";
import { getAccessToken, getUser } from "../services/UserService";
import Cookies from "js-cookie";
// import { SessionProvider } from "next-auth/react"

export default function UserProvider({
    children,
}: {
    children: React.ReactNode,
}): React.ReactNode {
    console.log("--- UserProvider ---")

    const [user, setUser] = useState(initialUser)

    useEffect(() => {
        (async () => {
            const token = Cookies.get('access_token');
            if (token) {
                const user = await getUser(token);
                console.log("AuthProvider:", user)
                setUser(user);
            }
        })();
    }, [])

    // Test User
    // const [user, setUser] = useState<User>(testUser);
    const value = {
        user,
        setUser,
    };
    console.log(user?.accessToken)
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
        // <SessionProvider session={session}>
        //     {children}
        // </SessionProvider>
    )
}