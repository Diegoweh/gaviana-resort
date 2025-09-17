"use client";
import { motion } from "framer-motion";

export default function WeSection() {
  return (
    <>
      {/* Sección principal */}
      <section id="nosotros" className="max-w-6xl mx-auto px-6 bg-white">
        {/* Título */}
        <div className="text-center mb-10">
          <motion.h2
            className="text-4xl font-bold leading-tight"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="block text-[#104b67]">Bienvenido</span>
            <span className="block text-[#104b67]">a tu casa de playa</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            viewport={{ once: true }}
          >
            Disfruta de un espacio donde la arena, el mar y la tranquilidad se unen para
            regalarte momentos inolvidables.
          </motion.p>
        </div>

        {/* Sección de imágenes con textos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Imagen 1 */}
          <motion.div
            className="text-center"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/img/we1.webp"
              alt="Vista al mar"
              className="w-full h-64 md:h-full object-cover rounded-2xl shadow-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            />
            <motion.h3
              className="mt-4 text-xl font-semibold text-[#104b67]"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              Queremos superar tus expectativas
            </motion.h3>
            <motion.p
              className="mt-2 text-gray-900"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
            >
              Estamos listos para atenderte como mereces. Sea cual sea el motivo de tu visita: por trabajo, vacaciones con amigos, en familia, escapada romántica o si sólo buscas un momento para desconectarte de la vida real, Gaviana Resort lo tiene todo.
            </motion.p>
          </motion.div>

          {/* Imagen 2 */}
          <motion.div
            className="text-center"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/img/we2.webp"
              alt="Ambiente relajado"
              className="w-full h-64 md:h-full object-cover rounded-2xl shadow-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            />
            <motion.h3
              className="mt-4 text-xl font-semibold text-[#104b67]"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
              viewport={{ once: true }}
            >
              Ambiente Asegurado
            </motion.h3>
            <motion.p
              className="mt-2 text-gray-900"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
              viewport={{ once: true }}
            >
              Además, para continuar conquistando tus sentidos, contamos con 1 restaurante: Beach Grill, además 2 bares: Bar Gaviotas y el famoso Joe's Oyster Bar. Y para procurar tu serenidad, contamos con amplias y cómodas piscinas. Será un honor dar lo mejor de nosotros para que vivas la Experiencia Gaviana.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Banner inferior */}
      <section id="experiencias" className="w-full relative overflow-hidden">
        <motion.img
            src="/img/expBanner.webp"
            alt="Banner playa"
            className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh] object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2 
            }}
            viewport={{ once: true, margin: "-100px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </section>

      {/* Título */}
        <div className="text-center mb-10  py-10">
          <motion.h2
            className="text-4xl font-bold leading-tight"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="block text-[#104b67]">Un mar de experiencias, una promesa</span>
            <span className="block text-[#104b67]">de bienestar, un homenaje a la calma</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            viewport={{ once: true }}
          >
            Tenemos el compromiso de hacer de tu estancia aquí toda una experiencia única y el despertar de tus sentidos.
          </motion.p>
        </div>
    </>
  );
}
