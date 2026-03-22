import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Firebase Chat App',
  description: 'A real-time chat application built with Next.js and Firebase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
