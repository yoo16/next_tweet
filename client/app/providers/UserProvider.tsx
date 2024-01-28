"use client"

import React, { useEffect, useState } from "react";
import UserContext, { UserContextType } from "../context/UserContext";
import { initialUser } from "../models/User";
import { getUser } from "../services/UserService";
import Cookies from "js-cookie";

export default function UserProvider({
    children,
}: {
    children: React.ReactNode,
}): React.ReactNode {
    const [user, setUser] = useState(initialUser)

    useEffect(() => {
        (async () => {
            const token = Cookies.get('access_token') || "";
            const user = await getUser(token);
            console.log("AuthProvider:", user)
            setUser(user);
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
    )
}