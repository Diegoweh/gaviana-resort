// app/habitaciones/[slug]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { linkData } from "@/lib/link-data" 

type Params = {
  slug: string
}

export async function generateStaticParams() {
  // Pre-genera las rutas estáticas a partir de linkData
  return linkData.map((room) => ({ slug: room.slug }))
}

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const room = linkData.find((r) => r.slug === params.slug)
  if (!room) {
    return {
      title: "Habitación no encontrada",
      description: "La habitación que buscas no existe.",
      robots: { index: false },
    }
  }

  return {
    title: `${room.title} · Habitaciones`,
    description: room.description,
    openGraph: {
      title: room.title,
      description: room.description,
      images: [{ url: room.image }],
      type: "article",
    },
    alternates: {
      canonical: `/habitaciones/${room.slug}`,
    },
  }
}

export default function RoomPage({ params }: { params: Params }) {
  const room = linkData.find((r) => r.slug === params.slug)

  if (!room) {
    notFound()
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/#habitaciones" className="hover:underline">Habitaciones</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{room.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#f7a391]">{room.title}</h1>
        <p className="mt-2 text-stone-600 md:text-lg text-muted-foreground">
          {room.description}
        </p>
      </header>

      {/* Media + Facts */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Imagen principal */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg lg:col-span-3">
          <Image
            src={room.image || "/placeholder.svg"}
            alt={room.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
        </div>

        {/* Detalles */}
        <aside className="lg:col-span-2">
          <div className="rounded-2xl border bg-white p-6 space-y-4">
            <h2 className="text-xl font-semibold">Detalles de la habitación</h2>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                {room.guests} huésped{room.guests !== 1 ? "es" : ""}
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                {room.size}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Amenidades</h3>
              <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {room.amenities?.map((a, i) => (
                  <li key={`${room.id}-amenity-${i}`} className="text-sm">
                    • {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex gap-3">
              <Link
                href="/reservar"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-white font-medium hover:opacity-90 transition"
              >
                Reservar ahora
              </Link>
              <a
                href="https://wa.me/521234567890?text=Hola%2C%20quiero%20informes%20de%20la%20habitación"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border px-4 py-2 font-medium hover:bg-[#f5bdb1] transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Otras habitaciones */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Otras habitaciones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {linkData
            .filter((r) => r.slug !== room.slug)
            .slice(0, 3)
            .map((r) => (
              <Link
                key={r.id}
                href={`/habitaciones/${r.slug}`}
                className="group rounded-2xl overflow-hidden border hover:shadow-md transition"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={r.image || "/placeholder.svg"}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#f7a391]">{r.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {r.description}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  )
}
