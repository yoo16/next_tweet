import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/app/components/Navbar';
// import UserProvider from "@/app/providers/UserProvider"
import { NextAuthProvider } from './providers/NextAuthProvider';
import { Suspense } from 'react';
import Loading from './components/Loading';
import UploadImageProvider from './providers/UploadImageProvider';

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
  return (
    <html lang="ja">
      <body>
        {/* <UserProvider> */}
        <NextAuthProvider>
          <Navbar />
          <UploadImageProvider>
            <main className="flex min-h-screen flex-col p-5">
              {children}
            </main>
          </UploadImageProvider>
        </NextAuthProvider>
        {/* </UserProvider> */}
      </body>
    </html>
  )
}
