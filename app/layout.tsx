import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingReserva from "@/components/ui/FloatingLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <FloatingReserva />
        {children}
        <Footer />
      </body>
    </html>
  );
}
