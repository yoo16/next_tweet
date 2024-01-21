'use client'

import React, { useState } from "react";
import UserContext from "../context/UserContext";
import { User, initialUser } from "../models/User";
// import { SessionProvider } from "next-auth/react"

export default function AuthProvider({
    children,
    // user,
    // session,
}: {
    children: React.ReactNode
    // user: any
    // session: any
}): React.ReactNode {
    // console.log('UserContext:', user)
    const [user, setUser] = useState();
    const value = {
        user,
        setUser,
    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
        // <SessionProvider session={session}>
        //     {children}
        // </SessionProvider>
    )
}