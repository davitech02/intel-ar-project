// app/layout.tsx

import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppNavbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer'; // <-- IMPORT THE FOOTER
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';

import Chatbot from '@/components/Chatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Intel-Ar Inc.',
  description: 'AI at the service of performance and humanity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <div className="d-flex flex-column min-vh-100">
              <AppNavbar />
              <main className="flex-grow-1">{children}</main>
              <Footer /> {/* <-- ADD THE FOOTER HERE */}
              <Chatbot />
            </div>
            
          
          </LanguageProvider>
        </AuthProvider>    
      </body>
    </html>
  );
}