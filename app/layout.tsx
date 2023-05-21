import './globals.css'
import { Inter } from 'next/font/google'
import { Lato } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HeirBnB',
  description: 'For Heirs and Heiresses to borrow castles',
}

const font = Lato({
  subsets: ['latin'],
  weight: ['100', '400', '900']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <Navbar />
        {children}
      </body>
    </html>
  )
}
