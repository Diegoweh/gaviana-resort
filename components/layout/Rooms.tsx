"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const linkData = [
  {
    id: 1,
    title: "Estefanos",
    image: "/img/estefano.jpg",
  },
  {
    id: 2,
    title: "Patmoss",
    image: "/img/patmoss.jpg",
  },
  {
    id: 3,
    title: "Cristiana",
    image: "/img/cristiana.jpg",
  },
  {
    id: 4,
    title: "Rodas",
    image: "/img/rodas.jpg",
  },
  {
    id: 5,
    title: "Milos",
    image: "/img/milos.jpg",
  },
  {
    id: 6,
    title: "Creta",
    image: "/img/creta.jpg",
  },
  {
    id: 7,
    title: "Mykonos",
    image: "/img/mykonos.jpg",
  },
]

export default function Rooms() {
  const [selectedLink, setSelectedLink] = useState(linkData[0])

  return (
    <>
    <div id="habitaciones" className=" bg-background p-8 mb-6">
      <div className="max-w-7xl mx-auto">
        <section className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Encabezado compartido (ocupa ambas columnas) */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-4xl text-[#104b67] font-bold text-balance">Habitaciones</h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Elige entre nuestras diferentes categorías de habitaciones o suites de acuerdo a tu gusto o necesidad.
          </p>
        </div>

        {/* Columna izquierda: Links */}
        <div className="space-y-3">
          {linkData.map((link) => (
            <button
              key={link.id}
              onClick={() => setSelectedLink(link)}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                selectedLink.id === link.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted hover:bg-accent text-foreground hover:text-accent-foreground"
              }`}
            >
              <span className="font-medium">{link.title}</span>
            </button>
          ))}
        </div>

        {/* Columna derecha: Imagen (alineada y sticky) */}
        <div className=" lg:top-24 self-start">
          <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-lg bg-muted">
            <Image
              src={selectedLink.image || "/placeholder.svg"}
              alt={selectedLink.title}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(min-width:1024px) 50vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">{selectedLink.title}</h3>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>

    {/* Banner inferior */}
    <section className="w-full relative overflow-hidden">
      <motion.img
        src="/img/banner2.webp"
        alt="Banner playa"
        className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh] object-cover "
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2 
        }}
        viewport={{ once: true, margin: "-100px" }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

      {/* Texto centrado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Donde el mar
        </motion.h2>
        <motion.p 
          className="text-xl md:text-3xl mt-2"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          toca el cielo, la mente
        </motion.p>
        <motion.p 
          className="text-lg md:text-2xl mt-2"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          encuentra calma
        </motion.p>
      </div>
    </section>



    </>

    
  )
}
