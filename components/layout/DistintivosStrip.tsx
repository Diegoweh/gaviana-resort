"use client";
import Image from "next/image";

interface DistintivosImageOnlyProps {
  imageSrc: string;          // tu imagen con los logos
  imageAlt?: string;
  bgColor?: string;
  showTexture?: boolean;
  rounded?: boolean;
  maxWidthDesktop?: string;  // tamaño máximo en desktop
  maxWidthMobile?: string;   // tamaño máximo en mobile
  imagePriority?: boolean;
  imageQuality?: number;
  containerClassName?: string;
}

export default function DistintivosImageOnly({
  imageSrc,
  imageAlt = "Distintivos y certificaciones",
  bgColor = "bg-[#f4e7e4]",
  showTexture = true,
  rounded = true,
  maxWidthDesktop = "max-w-4xl",
  maxWidthMobile = "max-w-md",
  imagePriority = false,
  imageQuality = 85,
  containerClassName = "",
}: DistintivosImageOnlyProps) {
  return (
    <section
      className={`relative w-full ${bgColor} overflow-hidden`}
      aria-label="Distintivos y certificaciones"
    >
      {/* Fondo con textura suave */}
      {showTexture && (
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full opacity-25"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="soft-waves"
              x="0"
              y="0"
              width="220"
              height="220"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 110 Q55 55 110 110 T220 110 M0 150 Q55 95 110 150 T220 150"
                fill="none"
                stroke="rgba(0,0,0,0.05)"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#soft-waves)" />
        </svg>
      )}

      {/* Contenedor centrado */}
      <div
        className={`relative z-10 mx-auto flex justify-center items-center px-4 py-8 md:py-10 ${containerClassName}`}
      >
        <div className={`w-full ${maxWidthMobile} md:${maxWidthDesktop}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1400}
            height={260}
            quality={imageQuality}
            priority={imagePriority}
            className="w-full h-auto object-contain"
            sizes="(max-width: 768px) 90vw, 900px"
          />
        </div>
      </div>
    </section>
  );
}
