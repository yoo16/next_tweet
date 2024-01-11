'use client'

import { SessionProvider } from "next-auth/react"
import { User } from '@/app/models/User'

export default function ClientProvider({
    children,
    session,
    user,
}: {
    children: React.ReactNode,
    session: any,
    user: User,
}): React.ReactNode {
    console.log("ClientProvider:", user)
    return (
        <div>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </div>
    )
}