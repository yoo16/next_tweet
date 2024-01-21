"use client"

import React, { useState } from "react";
import UserContext from "../context/UserContext";
// import { SessionProvider } from "next-auth/react"

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode
}): React.ReactNode {
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