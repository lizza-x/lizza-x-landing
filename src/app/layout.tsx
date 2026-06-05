import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Lizza X | Desarrollo de Software & Aplicaciones Móviles',
  description: 'Empresa de tecnología especializada en el desarrollo de aplicaciones móviles nativas (Android/iOS) e híbridas (Kotlin Multiplatform, Flutter) y soluciones de Inteligencia Artificial.',
  keywords: ['Lizza X', 'Desarrollo Mobile', 'Kotlin Multiplatform', 'Android', 'iOS', 'Swift', 'Flutter', 'Inteligencia Artificial', 'Software de Alta Calidad'],
  authors: [{ name: 'Gustavo Lizarraga', url: 'https://github.com/lizza-x' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={plusJakarta.variable} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC script to inject theme instantly */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {/* Animated Fluid Liquid background wrapper */}
        <div className="fluid-bg-container">
          <div className="fluid-bg-blur">
            <div className="fluid-circle fluid-circle-1" />
            <div className="fluid-circle fluid-circle-2" />
            <div className="fluid-circle fluid-circle-3" />
            <div className="fluid-circle fluid-circle-4" />
          </div>
        </div>
        
        {children}
      </body>
    </html>
  );
}
