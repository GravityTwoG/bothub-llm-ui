import { IBM_Plex_Sans } from 'next/font/google';

export const font = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
  style: 'normal',
  variable: '--font-ibm-plex-sans',
});
