import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'ABTalks — 60-Day Coding Challenge',
  description: 'Build one meaningful thing every day. ABTalks helps Indian college students build consistency through daily coding, GitHub commits, and public learning streaks.',
  keywords: ['coding challenge', 'Indian students', 'programming', 'consistency', 'GitHub', 'ABTalks'],
  authors: [{ name: 'ABTalks' }],
  creator: 'ABTalks',
  openGraph: {
    title: 'ABTalks — 60-Day Coding Challenge',
    description: 'Build one meaningful thing every day for 60 days.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABTalks — 60-Day Coding Challenge',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#07070A',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={`antialiased ${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#16161D',
              border: '1px solid #27272F',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
            },
          }}
        />
      </body>
    </html>
  );
}
