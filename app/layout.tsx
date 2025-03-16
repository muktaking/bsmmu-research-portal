import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Top_nav from './components/top_nav';
import Footer from './components/footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Top_nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
