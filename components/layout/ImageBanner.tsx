'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BookingBar from '../ui/BookingBar';

interface ImageBannerProps {
  imageSrc: string;
  mobileImageSrc?: string;
  children?: React.ReactNode;
  overlayOpacity?: string;
  height?: string;
  priority?: boolean;
  titleImageSrc?: string; // 👈 en lugar de title, ahora se usa una imagen
}

const ImageBanner: React.FC<ImageBannerProps> = ({
  imageSrc,
  mobileImageSrc,
  children,
  overlayOpacity = 'bg-black/30',
  height = 'h-screen',
  priority = true,
  titleImageSrc, // 👈 imagen del título
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
          quality={65}
        />
      </motion.div>

      {/* Overlay opcional */}
      {overlayOpacity && (
        <div className={`absolute inset-0 ${overlayOpacity} z-10`} />
      )}

      {/* Imagen del título centrada arriba */}
      {titleImageSrc && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="absolute top-30 left-1/2 -translate-x-1/2 z-20 text-center px-4"
        >
          <Image
            src={titleImageSrc}
            alt="Título Gaviana Resort"
            title="Gaviana Resort - Tu paraíso en Mazatlán"
            width={240}
            height={80}
            className="mx-auto h-auto w-[60vw] md:w-[300px] object-contain drop-shadow-md"
            sizes="(max-width: 768px) 60vw, 300px"
            priority
          />
        </motion.div>
      )}

      {/* Contenido sobre la imagen */}
      {children && (
        <div className="relative z-20 flex items-center justify-center h-full px-4 text-center">
          {children}
        </div>        
      )}

      {/* Formulario centrado abajo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[95%] md:w-[80%] max-w-5xl"
      >
        <BookingBar />
      </motion.div>
    </section>
  );
};

export default ImageBanner;
