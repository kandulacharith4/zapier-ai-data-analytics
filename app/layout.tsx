import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zapier AI Data Analytics',
  description: 'Production-ready data analytics AI agent with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100">
        {children}
      </body>
    </html>
  );
}
