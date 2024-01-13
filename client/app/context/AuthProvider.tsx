'use client'

import { SessionProvider } from "next-auth/react"
import { createToken } from "@/app/services/UserService"

export default function AuthProvider({
    children,
    session
}: {
    children: React.ReactNode
    session: any
}): React.ReactNode {
    console.log('---AuthProvider---');

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}