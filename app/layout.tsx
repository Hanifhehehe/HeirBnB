import './globals.css'
import { Inter } from 'next/font/google'
import { Lato } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import { Toaster } from 'react-hot-toast'

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
        {/* <ClientOnly> */}
          <Toaster />
          <RegisterModal />
        {/* </ClientOnly> */}
        <Navbar />
        {children}
      </body>
    </html>
  )
}
