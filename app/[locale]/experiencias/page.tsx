"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export default function ExperienciasPage() {
  const t = useTranslations('experiencias');
  const locale = useLocale();

  const experiencias = [
    {
      id: 1,
      title: t('centroHistoricoTitle'),
      description: t('centroHistoricoDesc'),
      image: "/img/experiencias/centroHistorico.webp",
    },
    {
      id: 2,
      title: t('observatorioTitle'),
      description: t('observatorioDesc'),
      image: "/img/experiencias/observatorio.webp",
    },
    {
      id: 3,
      title: t('olasAltasTitle'),
      description: t('olasAltasDesc'),
      image: "/img/experiencias/olasAltas.webp",
    },
    {
      id: 4,
      title: t('acuarioTitle'),
      description: t('acuarioDesc'),
      image: "/img/experiencias/acuario.webp",
    },
  ];
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
              {t('pageTitle')}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              {t('pageSubtitle')}
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
              {t('ctaTitle')}
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              {t('ctaDescription')}
            </p>
            <a
              href={`/${locale}`}
              className="inline-block bg-[#c68b7e] hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
            >
              {t('ctaButton')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Back button */}
      <div className="py-8 text-center">
        <a
          href={`/${locale}`}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors"
        >
          ← {t('backToHome')}
        </a>
      </div>
    </div>
  );
}
