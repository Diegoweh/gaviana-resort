import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingReserva from "@/components/ui/FloatingLink";
import HomeCajaFlotante from "@/components/ui/HomeCajaFlotante";
import HideReservaBoxOnInternalPages from "@/components/ui/HideReservaBoxOnInternalPages";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validar que el locale sea válido
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Obtener mensajes para el idioma actual
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <FloatingReserva />
      <HomeCajaFlotante />
      <HideReservaBoxOnInternalPages />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
