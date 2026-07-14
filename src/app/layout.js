import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";

import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ReduxProvider } from "@/providers/redux-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lead Distribution",
  description: "Admin dashboard for lead distribution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ReduxProvider>
          <QueryProvider>
            <ToastProvider />
            {children}
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
