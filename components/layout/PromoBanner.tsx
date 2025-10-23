"use client";
import Image from "next/image";
import Link from "next/link";

interface PromoSplitBannerProps {
  imageSrc: string;
  title: string;
  kicker?: string;
  lines?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  bgColor?: string;
  reverse?: boolean;
  height?: string;
  rounded?: boolean;
  showTexture?: boolean;
}

export default function PromoSplitBanner({
  imageSrc,
  title,
  kicker,
  lines = [],
  ctaLabel = "Reservar",
  ctaHref = "#",
  bgColor = "bg-[#0f2e3f]",
  reverse = false,
  height = "h-[420px]",
  rounded = true,
  showTexture = true,
}: PromoSplitBannerProps) {
  return (
    <section
      className={`relative w-full
        +  h-auto md:${height}                       /* auto en mobile, fijo en desktop */
        +  overflow-visible md:overflow-hidden       /* no recortes en mobile */
        +  
        +  flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      {/* Imagen */}
      <div className="relative w-full md:w-1/2 h-[240px] md:h-auto min-h-[240px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
          priority
        />
      </div>

      {/* Panel derecho */}
      <div
        className={`relative w-full md:w-1/2 ${bgColor} text-white px-4 sm:px-6 md:px-10 py-8 md:py-10 flex items-center`}
      >
        {/* Gradiente de luz */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5" />

        {/* Textura de ondas */}
        {showTexture && (
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full opacity-25 mix-blend-overlay"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="waves-split"
                x="0"
                y="0"
                width="140"
                height="140"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 70 Q35 35 70 70 T140 70 M0 100 Q35 65 70 100 T140 100"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-split)" />
          </svg>
        )}

        {/* Contenido */}
        <div className="relative z-10 max-w-lg mx-auto md:mx-0">
          <h2 className="font-semibold italic text-[30px] md:text-[42px] leading-tight text-[#e9a79a] mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            {title}
          </h2>

          {kicker && (
            <p className="text-lg md:text-xl font-semibold mb-3">{kicker}</p>
          )}

          {lines?.length > 0 && (
            <div className="text-white/95 text-[15px] md:text-base leading-relaxed space-y-1 mb-6">
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
                  className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-2.5 text-slate-900 font-medium hover:bg-white/90 active:bg-white/80 shadow-sm transition"
                >
                  {ctaLabel}
                </a>
              ) : (
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-2.5 text-slate-900 font-medium hover:bg-white/90 active:bg-white/80 shadow-sm transition"
                >
                  {ctaLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
