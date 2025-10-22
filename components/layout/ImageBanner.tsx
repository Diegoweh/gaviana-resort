'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageBannerProps {
  imageSrc: string;
  mobileImageSrc?: string; // Optional separate mobile image
  children?: React.ReactNode;
  overlayOpacity?: string; // Ej: 'bg-black/30'
  height?: string; // Ej: 'h-screen' o 'h-[80vh]'
  priority?: boolean;
}

const ImageBanner: React.FC<ImageBannerProps> = ({
  imageSrc,
  mobileImageSrc,
  children,
  overlayOpacity = 'bg-black/30',
  height = 'h-screen',
  priority = true,
}) => {
  return (
    <section className={`relative w-full overflow-hidden ${height}`}>
      {/* Desktop Image */}
      <motion.div
        className="hidden md:block absolute inset-0 w-full h-full"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={imageSrc}
          alt="Hero Banner"
          title="Gaviana Resort - Tu casa de playa en Mazatlán"
          fill
          className="object-cover"
          priority={priority}
          sizes="100vw"
          quality={75}
        />
      </motion.div>

      {/* Mobile Image */}
      <motion.div
        className="block md:hidden absolute inset-0 w-full h-full"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={mobileImageSrc || imageSrc}
          alt="Hero Banner Mobile"
          title="Gaviana Resort - Tu casa de playa en Mazatlán"
          fill
          className="object-cover"
          priority={priority}
          sizes="100vw"
          quality={85}
        />
      </motion.div>

      {/* Overlay opcional */}
      {overlayOpacity && (
        <div className={`absolute inset-0 ${overlayOpacity} z-10`} />
      )}

      {/* Contenido sobre la imagen */}
      {children && (
        <div className="relative z-20 flex items-center justify-center h-full px-4 text-center">
          {children}
        </div>
      )}
    </section>
  );
};

export default ImageBanner;
