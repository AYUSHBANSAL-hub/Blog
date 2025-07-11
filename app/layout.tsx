import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Figtree } from 'next/font/google';
import { Roboto } from 'next/font/google';
import UserProvider from "./UserProvider";
import Providers from "./provider/page"; // ← should be a client component

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-figtree',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Blog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${roboto.variable}`}>
      <body className="antialiased font-figtree h-full flex flex-col">
        <Providers>
          <UserProvider>
            <div className="fixed top-0 left-0 right-0 z-50">
              <Navbar />
            </div>

            <main className="flex-1 mt-8">{children}</main>

            <Footer />
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
