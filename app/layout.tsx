import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

import { APP_NAME } from "@/config/constants";
import { AuthProvider } from "@/context/AuthContext";
import { getCurrentUser } from "@/lib/auth";

import "./globals.css";

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} | Team Productivity Dashboard`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "TeamPulse helps operations teams monitor employee productivity, engagement, and delivery risk.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${monoFont.variable} min-h-screen antialiased`}>
        <AuthProvider initialUser={currentUser}>{children}</AuthProvider>
      </body>
    </html>
  );
}
