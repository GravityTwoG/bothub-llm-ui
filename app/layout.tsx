import { Metadata } from 'next';

import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';

import { font } from './fonts';

import '@/ui/styles/theme.scss';
import '@/app/styles/app.scss';

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
