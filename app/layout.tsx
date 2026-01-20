import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Gaviana Resort – Bienvenido a tu casa de playa",
  description:
    "Disfruta Gaviana Resort, casa de playa en Mazatlán. Habitaciones y suites frente al mar, spa y experiencias para toda la familia. Reserva al mejor precio.",
  keywords: [
    "Gaviana Resort",
    "hotel en Mazatlán",
    "resort en Mazatlán",
    "frente al mar",
    "habitaciones y suites",
    "spa en Mazatlán",
    "reserva hotel Mazatlán",
    "playa Mazatlán",
    "vacaciones familiares",
    "escapada romántica",
    "turismo Mazatlán"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Fontspring-DEMO-mixtaesssharpit-regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
