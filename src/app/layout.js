import { Inter } from 'next/font/google'
import './globals.css'
import '@/css/General.css'
import Navbar from '@/components/navbar/Navbar'
import AuthProvider from '@/components/authProvider/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Boutique - Clothing',
  description: 'The best e-commerce',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div>
            <Navbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
