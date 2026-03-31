import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  metadataBase: new URL("https://gaviana.com"),
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
  alternates: {
    canonical: "https://gaviana.com/es",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Gaviana Resort" }],
  publisher: "Proyecta – Marketing Digital",
  openGraph: {
    title: "Gaviana Resort – Tu casa de playa en Mazatlán",
    description:
      "Habitaciones frente al mar, spa y experiencias únicas en Mazatlán. Reserva directo al mejor precio.",
    url: "https://gaviana.com/es",
    type: "website",
    locale: "es_MX",
    siteName: "Gaviana Resort",
    images: [
      {
        url: "https://gaviana.com/images/og-gaviana.jpg",
        width: 1200,
        height: 630,
        alt: "Gaviana Resort – Tu casa de playa en Mazatlán",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaviana Resort – Tu casa de playa en Mazatlán",
    description:
      "Habitaciones frente al mar, spa y experiencias únicas en Mazatlán.",
    images: ["https://gaviana.com/images/og-gaviana.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta httpEquiv="content-language" content="es" />
        <link
          rel="preload"
          href="/fonts/Fontspring-DEMO-mixtaesssharpit-regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: "Gaviana Resort",
              description:
                "Resort frente al mar en Mazatlán con habitaciones, suites, spa y experiencias para toda la familia.",
              url: "https://gaviana.com/es",
              logo: "https://gaviana.com/images/logo-gaviana.png",
              image: "https://gaviana.com/images/og-gaviana.jpg",
              telephone: "+52-669-913-5333",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Playa Gaviotas 100, Zona Dorada",
                addressLocality: "Mazatlán",
                addressRegion: "Sinaloa",
                postalCode: "82110",
                addressCountry: "MX",
              },
              starRating: {
                "@type": "Rating",
                ratingValue: "4",
              },
              priceRange: "$$",
              checkinTime: "15:00",
              checkoutTime: "12:00",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '757293961346932');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=757293961346932&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <GoogleAnalytics gaId="G-2YW2WELGGR" />
      </body>
    </html>
  );
}
