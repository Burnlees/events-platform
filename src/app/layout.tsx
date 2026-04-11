import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "src/components/ui/toaster";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { TopNav } from "./_components/TopNav";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NextUp",
  description: "Find your next event",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#9fe870",
          colorText: "#0e0f0c",
          colorBackground: "#ffffff",
          borderRadius: "30px",
        },
      }}
    >
      <html lang="en" className={inter.variable}>
        <body className="flex min-h-screen flex-col font-semibold">
          <TopNav />
          <main className="flex flex-grow flex-col items-center justify-center">
            {children}
            <Toaster />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
