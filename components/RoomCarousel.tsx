"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type RoomCarouselProps = {
  images: string[];
  roomTitle: string;
  roomSlug: string;
};

export default function RoomCarousel({
  images,
  roomTitle,
  roomSlug,
}: RoomCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideId = entry.target.id;
            const index = parseInt(slideId.split("-")[1]) - 1;
            setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    const slides = container.querySelectorAll("[id^='slide-']");
    slides.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, []);

  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Contenedor del carrusel con botones */}
      <div className="relative group">
        {/* Pista del carrusel */}
        <div
          ref={containerRef}
          id="carousel-container"
          className="
            relative
            overflow-x-auto
            flex
            snap-x snap-mandatory
            scroll-smooth
            rounded-2xl
            border
            bg-white
            shadow-sm
          "
          aria-label="Galería de imágenes de la habitación"
        >
          {images.map((src, idx) => {
            const slideId = `slide-${idx + 1}`;
            return (
              <div
                id={slideId}
                key={`${roomSlug}-img-${idx}`}
                className="
                  relative
                  min-w-full
                  snap-center
                  aspect-[16/10]
                "
              >
                <Image
                  src={src}
                  alt={`${roomTitle} ${idx + 1}`}
                  title={`${roomTitle} - Foto ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority={idx === 0}
                />
              </div>
            );
          })}
        </div>

        {/* Botones de navegación */}
        {images.length > 1 && (
          <>
            {/* Botón anterior */}
            <a
              href={`#slide-${images.length}`}
              className="
                absolute left-2 top-1/2 -translate-y-1/2
                bg-white/90 hover:bg-white
                rounded-full p-2 md:p-3
                shadow-lg
                transition-all duration-200
                opacity-100
                focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#104b67]
                z-10
              "
              aria-label="Imagen anterior"
              onClick={handlePrevious}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-[#104b67]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </a>

            {/* Botón siguiente */}
            <a
              href={`#slide-1`}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                bg-white/90 hover:bg-white
                rounded-full p-2 md:p-3
                shadow-lg
                transition-all duration-200
                opacity-100
                focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#104b67]
                z-10
              "
              aria-label="Imagen siguiente"
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-[#104b67]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </>
        )}
      </div>

      {/* Controles: Dots mejorados */}
      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((_, idx) => {
            const href = `#slide-${idx + 1}`;
            const isActive = idx === activeIndex;
            return (
              <a
                key={`dot-${idx}`}
                href={href}
                className={`
                  rounded-full
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-[#104b67] focus:ring-offset-2
                  ${
                    isActive
                      ? "h-2.5 w-8 bg-[#104b67]"
                      : "h-2.5 w-2.5 bg-gray-300 hover:bg-[#104b67]/60"
                  }
                `}
                aria-label={`Ir a la imagen ${idx + 1}`}
                aria-current={isActive ? "true" : "false"}
                title={`Imagen ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
