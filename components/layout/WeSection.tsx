"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageCarousel from "./Carousel";
import DistintivosImageOnly from "./DistintivosStrip";

const imagenesCarrusel = [
  '/img/backView.webp',
  '/img/pool.webp',
  
]

export default function WeSection() {
  return (
    <>
      {/* --- Banda full-bleed (ocupa todo el ancho) --- */}
      <div id="nosotros" className="w-full relative min-h-[45vh] flex flex-col items-center justify-center px-6 py-40">
        <Image
          src="/img/fondoHero.webp"
          alt="Fondo hero"
          title="Bienvenido a Gaviana Resort - Tu paraíso en la playa"
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
            <h1 className="inline-flex items-center gap-2 text-[#f5bdb1] font-mixta text-5xl">
              Bienvenido
              <Image
                src="/img/star.webp"
                alt="Decorativo"
                title="Estrella decorativa"
                width={72}
                height={72}
                className="align-middle"
                style={{ width: 'auto', height: 'auto' }}
              />
            </h1>
          </span>
          <span className="block text-[#104b67]">a tu casa de playa</span>
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto text-justify md:text-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
          viewport={{ once: true }}
        >
          Inspirados en la tranquilidad y la armonía de la incomparable unión  entre arena y mar, en Gaviana Resort nos tomamos muy  en serio tu descanso.
        </motion.p>
      </div>

      
      <section className="relative bg-[#f4e7e4] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
  
            {/* Right column - Description */}
            <div className="space-y-6 leading-relaxed text-center lg:text-left">
              <p className="text-[#104b67] lg:text-5xl text-3xl font-medium mb-2">
                Queremos superar
              </p>
              <p className="text-[#104b67] lg:text-5xl text-3xl font-medium  mb-6">
                tus expectativas
              </p>
              <p className="text-base sm:text-lg text-justify">
                Estamos listos para atenderte como mereces. Sea cual sea el motivo de tu visita: por trabajo, vacaciones con amigos, en familia, escapada romántica o si sólo buscas un momento para desconectarte de la vida real, Gaviana Resort lo tiene todo.
              </p>
  
              <a
                href="#"
                title="habitaciones"
                className="inline-block bg-[#34536c] text-white px-6 py-2 rounded-xl font-medium hover:bg-stone-700 transition-colors"
              >
                Habitaciones
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
        imageAlt="Certificaciones del Hotel Gaviana"
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
          src="/img/expBanner.webp"
          alt="Banner playa"
          title="Experiencias únicas en Gaviana Resort"
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
            <span className="block text-[#f5bdb1] text-justify">Un mar de experiencias, una promesa de bienestar, un homenaje a la calma</span>
            {/* <span className="block text-[#f5bdb1]">de bienestar, un homenaje a la calma</span> */}
          </motion.h2>

          <motion.p
            className="mt-3 md:mt-4 text-base md:text-xl text-white/90 text-justify mx-auto drop-shadow"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
            viewport={{ once: true }}
          >
            Tenemos el compromiso de hacer de tu estancia aquí toda una experiencia única y el despertar de tus sentidos.
          </motion.p>
        </div>
      </div>
    </section>

    </>
  );
}
