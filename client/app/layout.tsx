import type { Metadata } from 'next'
import { Suspense } from 'react';
import './globals.css'
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'Next Tweet',
  description: 'This is tweet app sample.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
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
