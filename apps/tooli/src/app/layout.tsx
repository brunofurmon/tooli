import type { Metadata } from 'next';
import { Providers } from './providers';
import './global.css';

export const metadata: Metadata = {
  title: 'Tooli - Team Decision Making Tools',
  description:
    'A collection of tools for team decision making, including spinning wheels, voting systems, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (!mode) {
                    localStorage.setItem('theme', 'dark');
                    document.documentElement.classList.add('dark');
                  } else if (mode === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--nextui-colors-background)',
          color: 'var(--nextui-colors-foreground)',
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
