import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/app/components/Navbar';
import UserProvider from "@/app/providers/UserProvider"

import { Suspense } from 'react';
import Loading from '@/app/components/Loading';

// import { getUser } from './services/UserService';
// import { User, initialUser } from './models/User';

// import { authOptions } from "@/app/api/auth/[...nextauth]/route"
// import { getServerSession } from "next-auth/next"
// import AuthContext from './context/UserContext';

export const metadata: Metadata = {
  title: 'Next Tweet',
  description: 'This is tweet app sample.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  // case Next Auth
  // const session = await getServerSession(authOptions)
  // session?.user.accessToken = access_token;
  // var user:User = initialUser;

  return (
    <html lang="ja">
      <body>
        <Suspense fallback={<Loading />}>
          <UserProvider>
            <Navbar />
            <main className="flex min-h-screen flex-col p-5">
              {children}
            </main>
          </UserProvider>
        </Suspense>
      </body>
    </html>
  )
}
