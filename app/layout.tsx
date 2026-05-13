import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CTF Write-Up Collection',
  description: 'A platform for sharing and reading detailed Capture The Flag write-ups.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200`}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
            <div className="container mx-auto flex h-16 max-w-5xl items-center px-4 md:px-6">
              <a href="/" className="flex items-center gap-2 transition-colors hover:text-emerald-400">
                <div className="rounded-md bg-emerald-500/10 p-1.5 border border-emerald-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" /><polyline points="14 2 14 8 20 8" /><path d="M2 15h10" /><path d="m9 18 3-3-3-3" /></svg>
                </div>
                <span className="font-bold tracking-tight text-lg">CTF Journal</span>
              </a>
              <nav className="ml-auto flex items-center gap-6 text-sm font-medium">
                <a href="/writeups" className="transition-colors hover:text-emerald-400 text-zinc-300">
                  Writeups
                </a>
                <a href="https://github.com/mayoka0" target="_blank" rel="noreferrer" className="transition-colors hover:text-zinc-100 text-zinc-400">
                  GitHub
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-zinc-800/80 py-6 md:py-0">
            <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row md:px-6 text-sm text-zinc-500">
              <p>Built for the cybersecurity community.</p>
              <p>Minimal & Secure Design</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
