import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import { WeatherContextProvider } from './contexts/WeatherContext';

const noto = Noto_Sans({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Atmos',
  description: 'Weather app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <WeatherContextProvider>
        <body className={noto.className}>{children}</body>
      </WeatherContextProvider>
    </html>
  )
}
