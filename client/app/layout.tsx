import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'Next Tweet',
  description: 'This is tweet app sample.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        {/* NabBarコンポーネント読み込み */}
        <Navbar />
        <main className="flex min-h-screen flex-col p-2">
          {children}
        </main>
      </body>
    </html>
  )
}
