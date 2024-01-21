'use client'

import { SessionProvider } from "next-auth/react"
import React from "react";
import AuthContext from "../context/UserContext";

export default function AuthProvider({
    children,
    user,
    // session,
}: {
    children: React.ReactNode
    user: any
    // session: any
}): React.ReactNode {
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
        // <SessionProvider session={session}>
        //     {children}
        // </SessionProvider>
    )
}