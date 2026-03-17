import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TiefAmt Test',
  description: 'TiefAmt component library proof of concept',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
