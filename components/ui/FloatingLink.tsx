"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const BOOKING_URL = "https://tusreservas.ejemplo.com"; // <-- cámbialo

export default function FloatingReserva() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-1/2 right-4 -translate-y-1/2 z-50"
    >
      <Link
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir módulo de reservas"
        className="
          flex items-center justify-center
          w-14 h-14 md:w-16 md:h-16
          rounded-full
          bg-[#c68b7e] text-white
          hover:bg-[#b47a6f] active:bg-[#a26c62]
          shadow-lg shadow-[#c68b7e]/30
          transition-colors
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-[#c68b7e]
        "
      >
        <Calendar size={26} strokeWidth={2.2} />
      </Link>
    </motion.div>
  );
}
