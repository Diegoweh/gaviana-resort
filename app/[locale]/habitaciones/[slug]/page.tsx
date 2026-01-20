// app/habitaciones/[slug]/page.tsx
"use server";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLinkData } from "@/lib/link-data";
import RecentBookingNotification from "@/components/RecentBookingNotification";
import RoomCarousel from "@/components/RoomCarousel";
import { getTranslations } from "next-intl/server";

type Params = { slug: string };

type Room = {
  id: number;
  title: string;
  slug: string;
  images: string[];
  description: string;
  guests: number;
  amenities?: string[];
  size?: string;
  included?: string[];
};

export async function generateStaticParams() {
  // Generate params for all rooms in all locales
  const locales = ['es', 'en'] as const;
  const params = [];

  for (const locale of locales) {
    const rooms = getLinkData(locale);
    for (const room of rooms) {
      params.push({ locale, slug: room.slug });
    }
  }

  return params;
}

export async function generateMetadata(
  { params }: { params: Promise<Params & { locale: string }> }
): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rooms' });
  const linkData = getLinkData(locale as 'es' | 'en');
  const room = linkData.find((r) => r.slug === slug) as Room | undefined;
  if (!room) {
    return {
      title: t('notFoundTitle'),
      description: t('notFoundDescription'),
      robots: { index: false },
    };
  }

  const ogImages =
    (room.images?.length ? room.images : ["/placeholder.svg"]).map((url) => ({
      url,
    }));

  return {
    title: `${room.title} · ${t('roomsSection')}`,
    description: room.description,
    openGraph: {
      title: room.title,
      description: room.description,
      images: ogImages,
      type: "article",
    },
    alternates: {
      canonical: `/${locale}/habitaciones/${room.slug}`,
    },
  };
}

export default async function RoomPage({ params }: { params: Promise<Params & { locale: string }> }) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rooms' });
  const linkData = getLinkData(locale as 'es' | 'en');
  const room = linkData.find((r) => r.slug === slug) as Room | undefined;

  if (!room) {
    notFound();
  }

  const images = room!.images?.length ? room!.images : ["/placeholder.svg"];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href={`/${locale}`} className="hover:underline">
          {t('home')}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/#habitaciones`} className="hover:underline">
          {t('roomsSection')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{room!.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#104b67]">
          {room!.title}
        </h1>
        <p className="mt-2 text-stone-600 md:text-lg text-muted-foreground max-w-3xl mx-auto">
          {room!.description}
        </p>
      </header>

      {/* Carousel centrado */}
      <section className="mb-8">
        <RoomCarousel
          images={images}
          roomTitle={room!.title}
          roomSlug={room!.slug}
        />
      </section>

      {/* Detalles debajo del carrusel (vistoso) */}
      <section className="mb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
            {/* Franja decorativa con gradiente */}
            <div className="h-2 w-full bg-gradient-to-r from-[#104b67] via-[#1e333c] to-[#104b67]" />

            <div className="p-6 md:p-8 space-y-6">
              <header className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold tracking-tight">{t('roomDetailsTitle')}</h2>
                {room!.description && (
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {room!.description}
                  </p>
                )}
              </header>

              {/* Stats / chips */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm bg-white">
                  {/* icono usuarios */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="2" d="M16 14a4 4 0 10-8 0v1a4 4 0 008 0v-1z" />
                    <path strokeWidth="2" d="M12 7a3 3 0 110-6 3 3 0 010 6z" />
                  </svg>
                  {room!.guests} {room!.guests !== 1 ? t('guestsPlural') : t('guests')}
                </span>

                {room!.size && (
                  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm bg-white">
                    {/* icono regla */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeWidth="2" d="M3 7l7-4 7 4v10l-7 4-7-4V7z" />
                    </svg>
                    {room!.size}
                  </span>
                )}

                {room!.amenities?.[0] && (
                  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm bg-white">
                    {/* icono brillo */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeWidth="2" d="M12 3v3m0 12v3M4.22 4.22l2.12 2.12m11.32 11.32l2.12 2.12M3 12h3m12 0h3M4.22 19.78l2.12-2.12m11.32-11.32l2.12-2.12" />
                    </svg>
                    {room!.amenities[0]}
                  </span>
                )}
              </div>

              {/* Amenidades (badges) */}
              {room!.amenities?.length ? (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{t('amenitiesTitle')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {room!.amenities.map((a, i) => (
                      <span
                        key={`${room!.id}-amenity-${i}`}
                        className="inline-flex items-center rounded-full bg-[#fff3ef] text-[#b05d49] border border-[#ffd9cf] px-3 py-1 text-xs"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Incluye (lista con checks) */}
              {room!.included?.length ? (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">{t('includesTitle')}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {room!.included.map((item, i) => (
                      <li key={`${room!.id}-included-${i}`} className="text-sm inline-flex items-start gap-2">
                        {/* check icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="https://wa.me/521234567890?text=Hola%2C%20quiero%20informes%20de%20la%20habitación"
                  className="inline-flex items-center justify-center rounded-xl bg-[#104b67] px-5 py-2.5 text-white font-medium hover:opacity-90 transition shadow-sm"
                >
                  {t('reserveNow')}
                </Link>
                {/* <a
                  href="https://wa.me/521234567890?text=Hola%2C%20quiero%20informes%20de%20la%20habitación"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border px-5 py-2.5 font-medium hover:bg-[#f5bdb1]/60 transition"
                >
                  WhatsApp
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notificación de reserva reciente */}
      <div className="max-w-3xl mx-auto space-y-6">
        <RecentBookingNotification roomTitle={room!.title} />
      </div>

      {/* Otras habitaciones */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">{t('otherRooms')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {linkData
            .filter((r) => r.slug !== room!.slug)
            .slice(0, 3)
            .map((r) => {
              const thumb = (r as Room).images?.[0] ?? "/placeholder.svg";
              return (
                <Link
                  key={r.id}
                  href={`/${locale}/habitaciones/${r.slug}`}
                  className="group rounded-2xl overflow-hidden border hover:shadow-md transition"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={thumb}
                      alt={r.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#104b67]">{r.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {r.description}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </main>
  );
}
