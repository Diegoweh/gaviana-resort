"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const BOOKING_URL = "https://tusreservas.ejemplo.com"; // <-- cámbialo

const navItems = [
  { href: "/#nosotros", label: "Nosotros", title: "nosotros" },
  { href: "/#experiencias", label: "Experiencias", title: "experiencias" },
  { href: "/#habitaciones", label: "Habitaciones", title: "habitaciones" },
  { href: "/#spa", label: "Spa", title: "spa" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const MOBILE_RIGHT_IMG = "/img/titleLogo.png"; // <-- cámbialo a tu ruta



  const LinkItem = ({ href, title, children }: any) => (
    <Link href={href} title={title} scroll onClick={() => setMenuOpen(false)}>
      <span className="relative cursor-pointer text-[15px] md:text-base px-2 py-1 text-slate-700/90 hover:text-[#c68b7e] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c68b7e] rounded-md after:absolute after:inset-x-2 after:-bottom-0.5 after:h-px after:scale-x-0 after:bg-[#c68b7e] hover:after:scale-x-100 after:transition-transform after:origin-left">
        {children}
      </span>
    </Link>
  );

  const ReservaButton = ({ className = "" }: { className?: string }) => {
    const isExternal = BOOKING_URL.startsWith("http");
    const Btn = (
      <span
        className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm md:text-[15px] font-medium text-white bg-[#c68b7e] hover:bg-[#b47a6f] active:bg-[#a26c62] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c68b7e] ${className}`}
      >
        Reserva
      </span>
    );

    return isExternal ? (
      <a
        title="Abrir módulo de reservas"
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir módulo de reservas"
      >
        {Btn}
      </a>
    ) : (
      <Link href={BOOKING_URL} aria-label="Abrir módulo de reservas" onClick={() => setMenuOpen(false)}>
        {Btn}
      </Link>
    );
  };

  return (
    <nav
      className="
        fixed inset-x-0 top-0 z-40
        bg-white/95 backdrop-blur-xl border-b border-white/50
        shadow-sm 
      "
      role="navigation"
      aria-label="Principal"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center justify-between h-16 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center"
        >
          {/* Izquierda (links desktop) */}
          <div className="hidden md:flex items-center gap-6 justify-self-start">
            <LinkItem href="/#nosotros" title="nosotros">Nosotros</LinkItem>
            <LinkItem href="/#experiencias" title="experiencias">Experiencias</LinkItem>
          </div>

          {/* Centro (logo) */}
          <div className="flex items-center justify-center justify-self-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="shrink-0"
            >
              <Link href="/" title="Home" aria-label="Ir al inicio" className="flex items-center">
                <Image
                  src="/img/gavLogo.png"
                  alt="Logo"
                  title="Gaviana Resort - Inicio"
                  width={44}
                  height={44}
                  fetchPriority="high"
                  priority
                  className="h-8 w-auto md:h-11 object-contain align-middle leading-none"
                  style={{ width: 'auto', height: 'auto' }}
                />

                {/* Imagen a la derecha del logo (solo mobile) */}
                <span className="md:hidden ml-3 inline-flex items-center">
                  <Image
                    src={MOBILE_RIGHT_IMG}
                    alt="Gaviana wordmark"
                    title="Gaviana"
                    width={96}           // ancho de referencia; ajusta según tu asset
                    height={20}          // alto de referencia; ajusta según tu asset
                    sizes="(max-width: 768px) 40vw, 0px"
                    className="h-7 w-auto object-contain"
                    priority
                  />
                </span>
              </Link>
            </motion.div>
          </div>


          {/* Derecha (links desktop) + Hamburguesa mobile */}
          <div className="flex items-center justify-end gap-3 justify-self-end">
            <div className="hidden md:flex items-center gap-6">
              <LinkItem href="/#habitaciones" title="habitaciones">Habitaciones</LinkItem>
              <LinkItem href="/#spa" title="spa">Spa</LinkItem>
              {/* CTA Reserva (desktop) */}
              <ReservaButton />
            </div>

            {/* Botón móvil (oculto en md+) */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:text-[#c68b7e] hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c68b7e]"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="md:hidden border-t border-white/50 bg-white/75 backdrop-blur-xl"
        >
          <div className="flex flex-col items-stretch divide-y divide-white/50">
            {/* CTA Reserva (mobile) */}
            <div className="px-6 py-4">
              <ReservaButton className="w-full" />
            </div>

            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                title={item.title}
                onClick={() => setMenuOpen(false)}
              >
                <div className="px-6 py-4 text-center text-slate-700 hover:text-[#c68b7e] active:bg-white/70 transition-colors">
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
