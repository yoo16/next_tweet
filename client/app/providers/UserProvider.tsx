"use client"

import React, { useEffect, useState } from "react";
import UserContext from "../context/UserContext";
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
            const token = await Cookies.get('access_token') || "";
            const user = await getUser(token);
            console.log("AuthProvider:", user)
            setUser(user);
        })();
    }, [])

    // Test User
    // const [user, setUser] = useState<User>(testUser);
    console.log(user?.accessToken)
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}