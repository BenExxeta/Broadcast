import type { Metadata } from 'next';
import { Libre_Baskerville, Playfair_Display } from 'next/font/google';
import { currentLang } from '@/lib/lang';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
});

const libre = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Abroadcast · Guadalajara Edition',
  description: 'A daily digest of local Guadalajara news for international residents.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await currentLang();
  return (
    <html lang={lang} className={`${playfair.variable} ${libre.variable}`}>
      <body className="min-h-screen font-body antialiased">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">{children}</div>
      </body>
    </html>
  );
}
