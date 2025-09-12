"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Navbar (versión estilo hotel):
 * - Paleta suave y relajada (marfil + azul verdoso)
 * - Efecto glass + sombra sutil
 * - En desktop el logo va centrado, enlaces a los lados
 * - En mobile, botón hamburguesa y menú desplegable
 */

const navItems = [
  { href: "/#we", label: "Nosotros", title: "we" },
  { href: "/#servicios", label: "Servicios", title: "service" },
  { href: "#contacto", label: "Contacto", title: "contact" },
  { href: "/projects", label: "Portafolio", title: "projects" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const LinkItem = ({ href, title, children }: any) => (
    <Link href={href} title={title} scroll={true} onClick={() => setMenuOpen(false)}>
      <span
        className="relative cursor-pointer text-[15px] md:text-base px-2 py-1 text-slate-700/90 hover:text-[#c68b7e] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c68b7e] rounded-md after:absolute after:inset-x-2 after:-bottom-0.5 after:h-px after:scale-x-0 after:bg-[#c68b7e] hover:after:scale-x-100 after:transition-transform after:origin-left"
      >
        {children}
      </span>
    </Link>
  );

  return (
    <nav className="w-full sticky top-0 z-30">
      {/* Barra contenedora */}
      <div className="mx-auto mt-4 max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex md:grid md:grid-cols-3 items-center rounded-2xl border border-white/50 bg-[rgba(255,255,255,0.6)] backdrop-blur-xl shadow-lg ring-1 ring-black/5"
          role="navigation"
          aria-label="Principal"
        >
          {/* Izquierda (links) - desktop */}
          <div className="hidden md:flex items-center gap-6 pl-6 py-3">
            <LinkItem href="/#we" title="we">Habitaciones</LinkItem>
            <LinkItem href="/#servicios" title="service">Spa</LinkItem>
          </div>

          {/* Centro (logo) */}
          <div className="flex flex-1 items-center justify-between md:justify-center px-4 py-3">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="shrink-0"
            >
              <Link href="/" title="Home" aria-label="Ir al inicio">
                <img
                  src="/img/gavLogo.svg"
                  alt="Logo"
                  className="object-contain w-[84px] md:w-[110px] h-auto drop-shadow-sm"
                />
              </Link>
            </motion.div>

            {/* Botón móvil */}
            <button
              className="md:hidden inline-flex items-end justify-end rounded-xl p-2 -mr-1 text-slate-700 hover:text-teal-700 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Derecha (links) - desktop */}
          <div className="hidden md:flex items-center justify-end gap-6 pr-6 py-3">
            <LinkItem href="#contacto" title="contact">Nosotros</LinkItem>
            <LinkItem href="/projects" title="projects">Experiencias</LinkItem>
          </div>
        </motion.div>

        {/* Menú móvil */}
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden mt-2 overflow-hidden rounded-2xl border border-white/50 bg-[rgba(255,255,255,0.7)] backdrop-blur-xl shadow-lg ring-1 ring-black/5"
          >
            <div className="flex flex-col items-stretch divide-y divide-white/50">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} title={item.title} onClick={() => setMenuOpen(false)}>
                  <div className="px-6 py-4 text-center text-slate-700 hover:text-teal-700 active:bg-white/70 transition-colors">
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Fondo sutil en degradado para sensación "resort" */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-teal-50 via-emerald-50/60 to-transparent" />
    </nav>
  );
}
