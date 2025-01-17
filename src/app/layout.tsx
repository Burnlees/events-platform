import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "src/components/ui/toaster";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TopNav } from "./_components/TopNav";

export const metadata: Metadata = {
  title: "NextUp",
  description: "Find your next event",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <TopNav />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
