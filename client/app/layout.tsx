import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar';
import AuthProvider from "@/app/providers/AuthProvider"

import { cookies } from "next/headers";
import { getUser } from './services/UserService';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

// import { authOptions } from "@/app/api/auth/[...nextauth]/route"
// import { getServerSession } from "next-auth/next"
// import { Suspense } from 'react';
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
  // const session = await getServerSession(authOptions)
  var cookie = cookies().get('access_token');
  var user;
  if (cookie) user = await getUser(cookie.value);
  // session?.user.accessToken = access_token;

  return (
    <html lang="ja">
      <body>
        <AuthProvider currentUser={user}>
          <Navbar />
          <main className="flex min-h-screen flex-col p-5">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
