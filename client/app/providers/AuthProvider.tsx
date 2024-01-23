"use client"

import React, { useState } from "react";
import UserContext, { UserContextType } from "../context/UserContext";
import { User, initialUser } from "../models/User";
import { getAccessToken, getUser } from "../services/UserService";
// import { SessionProvider } from "next-auth/react"

export default function AuthProvider({
    children,
    currentUser,
}: {
    children: React.ReactNode,
    currentUser: User
}): React.ReactNode {
    // Test User
    // const [user, setUser] = useState<User>(testUser);
    const [user, setUser] = useState<User>(currentUser);
    const value = {
        user,
        setUser,
    };
    console.log("--- AuthProvider ---")
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