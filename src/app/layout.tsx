import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WhisperBox',
  description: 'WhisperBox is a secure and anonymous platform where users can freely share their thoughts, feedback, and opinions without revealing their identity. Designed to foster open communication, WhisperBox offers a safe space for honest and candid conversations. Whether you’re providing feedback to a business, offering advice to a friend, or sharing personal insights, WhisperBox ensures your voice is heard while keeping your identity confidential. Join a community built on trust, transparency, and genuine expression.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" >
      <AuthProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}