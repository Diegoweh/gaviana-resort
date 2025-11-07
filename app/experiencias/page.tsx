"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const experiencias = [
  {
    id: 1,
    title: "Centro Histórico",
    description:
      "A solo un paseo, descubre la vibrante Plazuela Machado, epicentro de la vida cultural con cafés, galerías y música en vivo.",
    image: "/img/experiencias/centroHistorico.webp",
  },
  {
    id: 2,
    title: "Observatorio 1873",
    description:
      "Descubre la Perla del Pacífico desde el histórico Observatorio 1873, una parada cultural y visual imperdible cerca de Gaviana Resort.",
    image: "/img/experiencias/observatorio.webp",
  },
  {
    id: 3,
    title: "Paseo Olas Altas",
    description:
      "El Paseo Olas Altas te espera con su encanto bohemio e histórico. Disfruta de románticos atardeceres sobre el Pacífico, justo donde rompen las olas.",
    image: "/img/experiencias/olasAltas.webp",
  },
  {
    id: 4,
    title: "Acuario Mazatlán",
    description:
      "¡Prepárate para la aventura más profunda! A solo minutos del Gaviana Resort, te espera el acuario más grande de Latinoamérica. Sumérgete sin mojarte en la vida marina del Pacífico Mexicano.",
    image: "/img/experiencias/acuario.webp",
  },
];

export default function ExperienciasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[#104b67] text-white py-20 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Experiencias en Mazatlán
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              Descubre lo mejor de la Perla del Pacífico con nuestras
              recomendaciones para vivir momentos inolvidables durante tu
              estadía.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experiencias Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {experiencias.map((experiencia, index) => (
              <motion.div
                key={experiencia.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Imagen */}
                <div
                  className={`relative h-[300px] sm:h-[400px] lg:h-[450px] rounded-lg overflow-hidden shadow-xl ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={experiencia.image}
                    alt={experiencia.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Contenido */}
                <div
                  className={`space-y-4 ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="inline-block">
                    {/* <span className="text-[#c68b7e] font-semibold text-sm uppercase tracking-wider">
                      Experiencia {experiencia.id}
                    </span> */}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#104b67]">
                    {experiencia.title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {experiencia.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#104b67] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para vivir estas experiencias?
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Reserva tu estadía en Gaviana Resort y descubre todo lo que
              Mazatlán tiene para ofrecerte.
            </p>
            <a
              href="/"
              className="inline-block bg-[#c68b7e] hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Hacer una Reservación
            </a>
          </motion.div>
        </div>
      </section>

      {/* Back button */}
      <div className="py-8 text-center">
        <a
          href="/"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors"
        >
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}
