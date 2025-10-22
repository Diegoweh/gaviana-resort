'use client';
import React from 'react';

interface VideoBannerProps {
  desktopVideo: string;
  mobileVideo: string;
  children?: React.ReactNode;
  overlayOpacity?: string; // Ej: 'bg-black/30'
  height?: string; // Ej: 'h-screen' o 'h-[80vh]'
}

const VideoBanner: React.FC<VideoBannerProps> = ({
  desktopVideo,
  mobileVideo,
  children,
  overlayOpacity = 'bg-black/30',
  height = 'h-screen',
}) => {
  return (
    <section className={`relative w-full overflow-hidden ${height}`}>
      {/* Video Desktop */}
      <video
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/img/video-poster.webp"
      >
        <source src={desktopVideo} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* Video Mobile */}
      <video
        className="block md:hidden absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/img/video-poster.webp"
      >
        <source src={mobileVideo} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* Overlay opcional (actívalo si quieres oscurecer para legibilidad) */}
      {/* <div className={`absolute inset-0 ${overlayOpacity} z-10`} /> */}

      {/* Contenido sobre el video */}
      {/* <div className="relative z-20 flex items-center justify-center h-full px-4 text-center">
        {children}
      </div> */}
    </section>
  );
};

export default VideoBanner;
