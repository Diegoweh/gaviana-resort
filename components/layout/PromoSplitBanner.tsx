"use client";
import Image from "next/image";
import Link from "next/link";

interface PromoSplitBannerProps {
  imageSrc: string;
  mobileImageSrc?: string;
  title: string;
  kicker?: string;
  lines?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  bgColor?: string;
  height?: string;
  showTexture?: boolean;
}

export default function PromoSplitBanner({
  imageSrc,
  mobileImageSrc,
  title,
  kicker,
  lines = [],
  ctaLabel = "Reservar",
  ctaHref = "#",
  bgColor = "bg-[#0f2e3f]",
  height = "h-[420px]",
  showTexture = true,
}: PromoSplitBannerProps) {
  return (
    <section
      className={`relative w-full ${height} overflow-hidden`}
    >
      {/* Imagen de fondo - Desktop */}
      <div className="hidden md:block relative w-full h-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
          priority
        />
      </div>

      {/* Imagen de fondo - Mobile */}
      <div className="block md:hidden relative w-full h-[600px]">
        <Image
          src={mobileImageSrc || imageSrc}
          alt={title}
          fill
          className="object-fit"
          sizes="100vw"
          quality={85}
          priority
        />
      </div>

      {/* Overlay gradient para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Contenido superpuesto - Mobile: abajo, Desktop: derecha */}
      <div className="absolute inset-0 flex items-end md:items-center md:justify-end px-4 md:px-12 py-6 md:py-10">
        <div
          className={`relative bg-opacity-0 md:bg-opacity-90 text-white px-0 md:px-10 py-0 md:py-8 max-w-full md:max-w-xl rounded-none md:rounded-lg`}
          style={{
            backdropFilter: "blur(0px)",
          }}
        >
          {/* Textura de ondas solo en desktop */}
          {showTexture && (
            <svg
              className="hidden md:block pointer-events-none absolute inset-0 w-full h-full opacity-15 mix-blend-overlay"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="waves-overlay"
                  x="0"
                  y="0"
                  width="140"
                  height="140"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 70 Q35 35 70 70 T140 70 M0 100 Q35 65 70 100 T140 100"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#waves-overlay)" />
            </svg>
          )}

          <div className="relative z-10">
            <h2 className="font-semibold italic text-[28px] md:text-[42px] leading-tight text-[#e9a79a] mb-3 md:mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {title}
            </h2>

            {kicker && (
              <p className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {kicker}
              </p>
            )}

            {lines?.length > 0 && (
              <div className="text-white/95 text-[14px] md:text-base leading-relaxed space-y-1 mb-4 md:mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {lines.map((l, i) => (
                  <p key={i}>{l}</p>
                ))}
              </div>
            )}

            {ctaLabel && (
              <div>
                {ctaHref.startsWith("http") ? (
                  <a
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-2.5 text-slate-900 font-medium hover:bg-white/90 active:bg-white/80 shadow-lg transition"
                  >
                    {ctaLabel}
                  </a>
                ) : (
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-2.5 text-slate-900 font-medium hover:bg-white/90 active:bg-white/80 shadow-lg transition"
                  >
                    {ctaLabel}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
