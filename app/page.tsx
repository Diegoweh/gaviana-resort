"use client";
import ImageCarousel from "@/components/layout/Carousel";

import Rooms from "@/components/layout/Rooms";
import VideoBanner from "@/components/layout/VideoBanner";
import WeSection from "@/components/layout/WeSection";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

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

    <Rooms />

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

    <footer className="bg-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Side - Logo and Contact Info */}
            <div className="space-y-6">
              {/* Logo and Resort Name */}
              <div className="flex items-center gap-3">
                <div className="w-24 h-24 rounded flex items-center justify-center">
                  {/* Placeholder for logo - you can replace this with your actual logo */}
                  
                  <img src="/img/gavLogo.svg" alt="" />
                  
                </div>
                {/* <h3 className="text-xl font-semibold">Gaviana Resort Mazatlán</h3> */}
              </div>

              {/* Address */}
              <div className="space-y-1 text-gray-300">
                <p>Av. Playa Gaviotas 100, Zona Dorada, 82110</p>
                <p>Mazatlán, Sinaloa.</p>
                <p className="text-orange-400">reservaciones@gaviana.com</p>
              </div>

              {/* Phone Numbers */}
              <div className="space-y-1 text-gray-300">
                <p>
                  <span className="text-orange-400 font-medium">MX</span> 800 716 9700
                </p>
                <p>
                  <span className="text-orange-400 font-medium">CA</span> 1877 756 7532
                </p>
                <p>
                  <span className="text-orange-400 font-medium">US</span> 1 800 528 8760
                </p>
                <a
                href="https://wa.me/52XXXXXXXXXX?text=Hola%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-green-500"
                aria-label="Enviar mensaje por WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Mensaje de WhatsApp</span>
              </a>

              </div>
            </div>

            {/* Right Side - Legal Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Legales</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  Aviso de privacidad
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  Términos y condiciones
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  Facturación
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-600 mt-12 pt-8 text-center text-gray-400">
            <p>2021 Gaviana Resort. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>


    
   
    </>

  );
}
