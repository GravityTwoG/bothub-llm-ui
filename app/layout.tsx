import { Metadata } from 'next';

import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';

import '@/ui/styles/theme.scss';
import '@/app/styles/app.scss';

import { IBM_Plex_Sans } from 'next/font/google';

const font = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
  style: 'normal',
  variable: '--font-ibm-plex-sans',
});

export const metadata: Metadata = {
  title: 'BotHub',
  description: 'BotHub is a ...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body className="custom-scrollbar">
        <div id="root">
          <div>
            <Header />

            {children}

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
