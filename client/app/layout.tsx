import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar';
import { User } from '@/app/models/User';
import { GetUser } from '@/app/services/UserService';
import UserProvider from '@/app/context/UserContext';

import { cookies } from "next/headers";

// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"
// import ClientProvider from "@/app/context/ClientProvider"

export const metadata: Metadata = {
  title: 'Next Tweet',
  description: 'This is tweet app sample.',
}

export const GetAccessToken = (): string => {
  const cookieStore = cookies()
  const cookie = cookieStore.get('access_token')
  return (cookie?.value) ? cookie.value : "";
}

// export const user = createContext()
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  // const session = await getServerSession(authOptions)
  // console.log("Session:", session)

  return (
    <html lang="ja">
      <body>
        <Navbar />
        <main className="flex min-h-screen flex-col p-5">
          {children}
        </main>
      </body>
    </html>
  )
}
