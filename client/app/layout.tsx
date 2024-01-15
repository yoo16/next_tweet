import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar';

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import AuthProvider from "@/app/context/AuthProvider"
import { Suspense } from 'react';
import Loading from './components/Loading';

export const metadata: Metadata = {
  title: 'Next Tweet',
  description: 'This is tweet app sample.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="ja">
      <body>
        <Suspense fallback={<Loading />}>
          <AuthProvider session={session}>
            <Navbar />
            <main className="flex min-h-screen flex-col p-5">
              {children}
            </main>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
