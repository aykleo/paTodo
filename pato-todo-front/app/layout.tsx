import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OpenLogModalButton from "@/components/openLogModalButton";
import { AuthProvider } from "@/lib/context/authContext";
import { TodoProvider } from "@/lib/context/todoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <TodoProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="w-full h-12 absolute bg-white flex items-center justify-end px-6 py-2">
              <OpenLogModalButton className="rounded-md border border-black px-3 py-1">
                Login
              </OpenLogModalButton>
            </div>
            {children}
          </body>
        </html>
      </TodoProvider>
    </AuthProvider>
  );
}
