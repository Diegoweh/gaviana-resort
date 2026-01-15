"use client";
import CarouselRooms from "@/components/CarouselRooms";
import ImageCarousel from "@/components/layout/Carousel";

import ImageBanner from "@/components/layout/ImageBanner";
import WeSection from "@/components/layout/WeSection";
import { motion } from "framer-motion";
import { linkData } from "@/lib/link-data"

import Image from "next/image";
import PromoSplitBanner from "@/components/layout/PromoSplitBanner";

import { MessageCircle } from "lucide-react";

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
    <ImageBanner
      titleImageSrc="/img/titleLogo.png"      
      imageSrc="/img/hero2.webp"
      mobileImageSrc="/img/heroMovil.webp"
      height="h-screen"
      overlayOpacity="bg-black/40"
      priority
    />
    <PromoSplitBanner
      slides={[
        {
          imageSrc: "/img/sessonBanner.webp",
          mobileImageSrc: "/img/sessonBannerMobile.webp",
          title: "Preventa Semana Santa 2026",
          kicker: "Hasta un 45% de descuento",
          lines: [
            "Del 29 de marzo al 5 de abril, te espera Hotel Gaviana.",
            "Reserva ya y vive la pasión del puerto con vista al mar.",
            "¡Tu descanso perfecto está en Mazatlán!",
          ],
          ctaLabel: "Reservar",
          ctaHref: `https://wa.me/5216691234567?text=${encodeURIComponent(
            "Hola, quiero reservar para Semana Santa 2026 en Hotel Gaviana."
          )}`,
        },
        // Puedes agregar más slides aquí
       {
          imageSrc: "/img/sessonBanner-2.webp",
          mobileImageSrc: "/img/sessonBannerMobile-2.webp",
          title: "Promoción Enero 2026",
          kicker: "Hasta un 45% de descuento",
          lines: [
            "Este enero 2026, disfruta Mazatlán desde Hotel Gaviana.",
            "Aprovecha hasta 45% de descuento reservando con anticipación.",
            "¡Escápate al mar y empieza el año como se debe!",
          ],
          ctaLabel: "Reservar",
          ctaHref: `https://wa.me/5216691234567?text=${encodeURIComponent(
            "Hola, quiero aprovechar la Promoción Enero 2026 en Hotel Gaviana. ¿Me comparten disponibilidad y tarifas?"
          )}`,
        },
        
      ]}
      height="h-[420px]"
      showTexture
      autoPlayInterval={5000}
    />

    

    <WeSection />
    

    <div className="w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-6 py-18 mb-4 ">
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
            <Image
              src="/img/concha.jpg"
              alt="Decorativo"
              title="Icono decorativo de concha"
              width={72}
              height={72}
              className="align-middle"
              style={{ width: 'auto', height: 'auto' }}
            />
          </span>
        </span>
        {/* <span className="block text-[#104b67]">a tu casa de playa</span> */}
      </motion.h2>

      <motion.p
        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto text-justify"
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
            <p className="text-base sm:text-lg md:text-start text-justify">
              Date el gusto de salir del estrés que se vive en la ciudad. Visita el Spa Pyramides y deja tu descanso en manos de quienes saben. Ofrecemos para ti una gran variedad de opciones para tu relajación.
            </p>

            <a
              href="#"
              title="home"
              className="inline-block bg-[#dd8e80] text-white px-6 py-2 rounded-xl font-medium hover:bg-stone-600 transition-colors"
            >
              Ver más
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Carousel section 2 */}
    <section className="relative bg-stone-50 py-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Right column - Description */}          
          <div className="space-y-6 leading-relaxed">
            <p className="text-stone-500 lg:text-2xl text-lg font-medium uppercase mb-6">
              El sabor de Mazatlán
            </p>
            <p className="text-[#104b67] lg:text-5xl text-lg font-medium mb-6">
              Experiencias y Gastronomía
            </p>           
            <p className="text-base sm:text-lg md:text-start text-justify">
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

    {/* Sección de Contacto y Ubicación */}
    <section className="w-full bg-slate-50 py-12 sm:py-16 bg-[url('/img/bg2.webp')]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Información de Contacto - Izquierda */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#104b67] mb-2">
                Contáctanos
              </h2>
              <p className="text-gray-600">
                Estamos aquí para ayudarte con tu reservación
              </p>
            </div>

            {/* Dirección */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#104b67]">Dirección</h3>
              <div className="text-gray-700">
                <p>Av. Playa Gaviotas 100, Zona Dorada, 82110</p>
                <p>Mazatlán, Sinaloa, México</p>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#104b67]">Email</h3>
              <a
                href="mailto:reservaciones@gaviana.com"
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                reservaciones@gaviana.com
              </a>
            </div>

            {/* Teléfonos */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#104b67]">Teléfonos</h3>
              <div className="space-y-1 text-gray-700">
                <p>
                  <span className="text-orange-500 font-medium">MX</span>{' '}
                  <a href="tel:+528007169700" className="hover:text-[#104b67] transition-colors">
                    800 716 9700
                  </a>
                </p>
                <p>
                  <span className="text-orange-500 font-medium">CA</span>{' '}
                  <a href="tel:+18777567532" className="hover:text-[#104b67] transition-colors">
                    1877 756 7532
                  </a>
                </p>
                <p>
                  <span className="text-orange-500 font-medium">US</span>{' '}
                  <a href="tel:+18005288760" className="hover:text-[#104b67] transition-colors">
                    1 800 528 8760
                  </a>
                </p>
                <a
                  title='Enviar mensaje por WhatsApp'
                  href="https://wa.me/5216691527305?text=Hola%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#104b67] hover:text-green-500"
                  aria-label="Enviar mensaje por WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Mensaje de WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps - Derecha */}
          <div className="h-[400px] lg:h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.7841863448634!2d-106.43669892377894!3d23.253944107910668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869f53e7d84e7f27%3A0x1e8e8e8e8e8e8e8e!2sAv.%20Playa%20Gaviotas%20100%2C%20Zona%20Dorada%2C%2082110%20Mazatl%C3%A1n%2C%20Sin.!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Gaviana Resort en Mazatlán"
            />
          </div>
        </div>
      </div>
    </section>   
   
    </>

  );
}
