import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar';
import AuthProvider from "@/app/providers/AuthProvider"

// import { authOptions } from "@/app/api/auth/[...nextauth]/route"
// import { getServerSession } from "next-auth/next"
// import { Suspense } from 'react';
import { cookies } from "next/headers";
import AuthContext from './context/UserContext';
import { initialUser } from './models/User';
import { getUser } from './services/UserService';

export const metadata: Metadata = {
  title: 'Next Tweet',
  description: 'This is tweet app sample.',
}

const getCookie = (key: string) => {
  const cookie = cookies()
    .getAll()
    .find((cookie) => cookie.name == key);
  return cookie;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  // const session = await getServerSession(authOptions)
  // var access_token = cookies().get('access_token');
  // session?.user.accessToken = access_token;
  // console.log("access_token:", access_token)
  // console.log("Session:", session)

  console.log('layout.tsx')
  const cookie = getCookie('access_token')
  var user;
  if (cookie && cookie?.value) {
    user = await getUser(cookie.value)
  }

  return (
    <html lang="ja">
      <body>
        <AuthProvider user={{ user }}>
          <Navbar />
          <main className="flex min-h-screen flex-col p-5">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
