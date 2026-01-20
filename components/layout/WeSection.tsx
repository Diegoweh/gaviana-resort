"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageCarousel from "./Carousel";
import DistintivosImageOnly from "./DistintivosStrip";
import { useTranslations } from "next-intl";

const imagenesCarrusel = [
  '/img/backView.webp',
  '/img/pool.webp',

]

export default function WeSection() {
  const t = useTranslations('weSection');

  return (
    <>
      {/* --- Banda full-bleed (ocupa todo el ancho) --- */}
      <div id="nosotros" className="w-full relative min-h-[45vh] flex flex-col items-center justify-center px-6 py-40">
        <Image
          src="/img/fondoHero.webp"
          alt={t('backgroundAlt')}
          title={t('backgroundTitle')}
          fill
          className="object-cover -z-10"
          sizes="(max-width: 515px) 100vw, (max-width: 1200px) 80vw, 1200px"
          quality={75}

        />
        <motion.h2
          className="text-4xl font-bold leading-tight text-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          <span className="block text-[#104b67]">
            <h1 className="inline-flex items-center gap-2 text-[#104b67] font-mixta text-5xl">
              {t('welcome')}
              <Image
                src="/img/star.webp"
                alt={t('starAlt')}
                title={t('starTitle')}
                width={72}
                height={72}
                className="align-middle"
                style={{ width: 'auto', height: 'auto' }}
              />
            </h1>
          </span>
          <span className="block text-[#104b67]">{t('toYourBeachHouse')}</span>
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto text-justify md:text-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
          viewport={{ once: true }}
        >
          {t('heroDescription')}
        </motion.p>
      </div>

      
      <section className="relative bg-[#f4e7e4] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
  
            {/* Right column - Description */}
            <div className="space-y-6 leading-relaxed text-center lg:text-left">
              <p className="text-[#104b67] lg:text-5xl text-3xl font-medium mb-2">
                {t('weWantToExceed')}
              </p>
              <p className="text-[#104b67] lg:text-5xl text-3xl font-medium  mb-6">
                {t('yourExpectations')}
              </p>
              <p className="text-base sm:text-lg text-justify">
                {t('description')}
              </p>

              <a
                href="#"
                title="habitaciones"
                className="inline-block bg-[#34536c] text-white px-6 py-2 rounded-xl font-medium hover:bg-stone-700 transition-colors"
              >
                {t('roomsButton')}
              </a>
            </div>
  
            {/* Left column - Heading */}
            <div className="space-y-6">
              <div className="lg:w-full relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageCarousel images={imagenesCarrusel}/>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <DistintivosImageOnly
        imageSrc="/img/distintivos.png"
        imageAlt={t('certificationsAlt')}
        maxWidthDesktop="max-w-5xl"   // más grande en desktop
        maxWidthMobile="max-w-sm"     // tamaño cómodo en mobile
        imagePriority
      />

      {/* Banner + Título superior */}
      <section
        id="experiencias"
        className="relative w-full overflow-hidden h-[50vh] md:h-[70vh] lg:h-[80vh]"
      >
      {/* Imagen de fondo optimizada con Next.js Image */}
      <div className="absolute inset-0 w-full h-full animate-heroFade">
        <Image
          src="/img/expBanner-2.webp"
          alt={t('experiencesBannerAlt')}
          title={t('experiencesBannerTitle')}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={70}
        />
      </div>

      {/* Gradiente para legibilidad */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />

      {/* Contenido arriba del banner */}
      <div className="relative z-20 h-full">
        <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-28">
          <motion.h2
            className="text-2xl md:text-5xl text-center font-bold leading-tight text-white drop-shadow"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="block text-white text-shadow-lg md:text-center text-justify">{t('experiencesTitle')}</span>
          </motion.h2>

          <motion.p
            className="mt-3 md:mt-4 text-base md:text-xl text-white text-shadow-lg md:text-center text-justify mx-auto drop-shadow"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
            viewport={{ once: true }}
          >
            {t('experiencesDescription')}
          </motion.p>
        </div>
      </div>
    </section>

    </>
  );
}
