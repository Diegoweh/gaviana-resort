"use client";
import CarouselRooms from "@/components/CarouselRooms";
import ImageCarousel from "@/components/layout/Carousel";

import Rooms from "@/components/layout/Rooms";
import VideoBanner from "@/components/layout/VideoBanner";
import WeSection from "@/components/layout/WeSection";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { linkData } from "@/lib/link-data"

import Image from "next/image";

const imagenesCarrusel = [
  '/img/spa1.webp',
  '/img/spa2.webp',
  
]

const imagenesCarrusel2 = [
  '/img/bar1.webp',
  '/img/bar2.webp',
  
]

export default function Home() {
  return (
    
    <>
    <VideoBanner
          desktopVideo="/media/gavianaHeader.mp4"
          mobileVideo="/media/gavianaHeader.mp4"          
    />
    <WeSection />

    <div className="w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-6 py-18 mb-4">
      <motion.h2
        className="text-4xl font-bold leading-tight text-center"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
      >
        <span className="block text-[#104b67]">
          <span className="inline-flex items-center gap-2 text-[#f5bdb1] font-mixta text-5xl">
            Habitaciones
            <img
              src="/img/concha.jpg"         // cambia por tu ruta
              alt="Decorativo"
              className="h-18 w-18 align-middle"  // ajusta tamaño
            />
          </span>
        </span>
        {/* <span className="block text-[#104b67]">a tu casa de playa</span> */}
      </motion.h2>

      <motion.p
        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto text-center"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
        viewport={{ once: true }}
      >
        Elige entre nuestras diferentes categorías de habitaciones o suites de acuerdo a tu gusto o necesidad para hacer de tu estadía una experiencia única.
      </motion.p>
    </div>
    
    <CarouselRooms slides={linkData} options={{ loop: true }} />     

    {/* <Rooms /> */}

    {/* Carousel section */}
    <section id="spa" className="relative bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left column - Heading */}
          <div className="space-y-6">
            <div className="lg:w-full relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageCarousel images={imagenesCarrusel}/>
            </div>
          </div>
          </div>

          {/* Right column - Description */}
          <div className="space-y-6 leading-relaxed">
            <p className="text-stone-500 lg:text-2xl text-lg font-medium uppercase mb-6">
              El descanso que mereces
            </p>
            <p className="text-[#104b67] lg:text-5xl text-lg font-medium  mb-6">
              SPA Pyramides
            </p>
            <p className="text-base sm:text-lg">
              Date el gusto de salir del estrés que se vive en la ciudad. Visita el Spa Pyramides y deja tu descanso en manos de quienes saben. Ofrecemos para ti una gran variedad de opciones para tu relajación.
            </p>

            <a
              href="#"
              className="inline-block bg-[#dd8e80] text-white px-6 py-2 rounded-xl font-medium hover:bg-stone-600 transition-colors"
            >
              Ver más
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Carousel section 2 */}
    <section className="relative bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Right column - Description */}
          <div className="space-y-6 leading-relaxed">
            <p className="text-[#104b67] lg:text-5xl text-lg font-medium mb-6">
              Experiencias y
            </p>
            <p className="text-[#104b67] lg:text-5xl text-lg font-medium  mb-6">
              Gastronomía
            </p>
            <p className="text-base sm:text-lg">
              Haremos de tu estancia en Mazatlán una visita inolvidable y placentera. En Gaviana podrás disfrutar de bares exclusivos y restaurantes temáticos, cada uno listo para recibirte y maravillarte con su concepto.
            </p>

            {/* <a
              href="#"
              className="inline-block bg-[#dd8e80] text-white px-6 py-2 rounded-xl font-medium hover:bg-stone-600 transition-colors"
            >
              Ver más
            </a> */}
          </div>

          {/* Left column - Heading */}
          <div className="space-y-6">
            <div className="lg:w-full relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageCarousel images={imagenesCarrusel2}/>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    {/* Banner inferior */}
    <section className="w-full relative isolate overflow-hidden">
      <div className="relative w-full h-[48vh] sm:h-[42vh] md:h-[38vh] lg:h-[385px]">
        <motion.img
          src="/img/map.webp"
          alt="Banner playa"
          className="absolute inset-0 w-full h-full object-cover object-[50%_60%]" 
          initial={{ scale: 1.08, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 1.0, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1 
          }}
          viewport={{ once: true, margin: "-100px" }}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent pointer-events-none" />
      </div>
    </section>   
   
    </>

  );
}
