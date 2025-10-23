"use client";
import { useState, useMemo } from "react";
import { X } from "lucide-react";

const WHATSAPP_PHONE = "5216691234567"; // 👈 cámbialo

type Props = {
  className?: string;
  defaultNights?: number; // por si quieres autocalcular salida
  onClose?: () => void;   // si lo usas como modal y quieres cerrar con la X
};

export default function BookingBar({
  className = "",
  defaultNights = 1,
  onClose,
}: Props) {
  const todayISO = new Date().toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState(todayISO);

  const checkOutDefault = useMemo(() => {
    const d = new Date(checkIn);
    d.setDate(d.getDate() + defaultNights);
    return d.toISOString().slice(0, 10);
  }, [checkIn, defaultNights]);

  const [checkOut, setCheckOut] = useState(checkOutDefault);
  const [rooms, setRooms] = useState(1);
  const [people, setPeople] = useState(1);
  const [promo, setPromo] = useState("");

  // formatea 2025-10-23 -> 23/10/2025
  const fmt = (iso: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const message = useMemo(() => {
    const parts = [
      "Hola, me gustaría reservar:",
      `• Fechas: ${fmt(checkIn)} - ${fmt(checkOut)}`,
      `• Habitaciones: ${rooms}`,
      `• Personas: ${people}`,
      promo ? `• Código promo: ${promo}` : "",
    ].filter(Boolean);
    return parts.join("\n");
  }, [checkIn, checkOut, rooms, people, promo]);

  const waLink = useMemo(() => {
    const base = `https://wa.me/${WHATSAPP_PHONE}`;
    const url = new URL(base);
    url.searchParams.set("text", message);
    return url.toString();
  }, [message]);

  // si el usuario cambia check-in, re-calculamos check-out por defecto si checkOut <= checkIn
  const handleCheckIn = (val: string) => {
    setCheckIn(val);
    if (checkOut <= val) {
      const d = new Date(val);
      d.setDate(d.getDate() + defaultNights);
      setCheckOut(d.toISOString().slice(0, 10));
    }
  };

  return (
    <div
      className={`relative mx-auto w-full max-w-5xl 
      rounded-md bg-[rgba(16,36,52,0.75)] backdrop-blur 
      text-white shadow-lg border border-white/10 ${className}`}
    >
      {/* header (línea superior con X opcional) */}
      <div className="absolute right-2 top-2">
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.9fr_0.9fr_1fr_auto] gap-4 md:gap-6 p-4 md:p-5 items-end">
        {/* Fechas (llegada - salida) */}
        <div className="w-full">
          <label className="block text-sm text-white/80 mb-2">
            Llegada - Salida
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                type="date"
                value={checkIn}
                min={todayISO}
                onChange={(e) => handleCheckIn(e.target.value)}
                className="w-full bg-transparent outline-none border-0 border-b 
                border-[#c68b7e]/60 focus:border-[#c68b7e] pb-1 text-white"
              />
            </div>
            <div className="relative">
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent outline-none border-0 border-b 
                border-[#c68b7e]/60 focus:border-[#c68b7e] pb-1 text-white"
              />
            </div>
          </div>
        </div>

        {/* Habitaciones */}
        <div>
          <label className="block text-sm text-white/80 mb-2">Habitaciones</label>
          <div className="relative">
            <select
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full appearance-none bg-transparent outline-none border-0 border-b 
              border-[#c68b7e]/60 focus:border-[#c68b7e] pb-1 pr-6 text-white"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n} className="bg-slate-800">
                  {n}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-0 bottom-1.5 pr-1">▾</span>
          </div>
        </div>

        {/* Personas */}
        <div>
          <label className="block text-sm text-white/80 mb-2">Personas</label>
          <div className="relative">
            <select
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full appearance-none bg-transparent outline-none border-0 border-b 
              border-[#c68b7e]/60 focus:border-[#c68b7e] pb-1 pr-6 text-white"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n} className="bg-slate-800">
                  {n}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-0 bottom-1.5 pr-1">▾</span>
          </div>
        </div>

        {/* Código Promo */}
        <div>
          <label className="block text-sm text-white/80 mb-2">Código Promo</label>
          <input
            type="text"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Opcional"
            className="w-full bg-transparent outline-none border-0 border-b 
            border-[#c68b7e]/60 focus:border-[#c68b7e] pb-1 text-white placeholder-white/60"
          />
        </div>

        {/* Botón Reservar */}
        <div className="flex md:justify-end">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap
            rounded-md px-5 py-2.5 text-[15px] font-medium bg-[#c68b7e] 
            hover:bg-[#b47a6f] active:bg-[#a26c62] text-white shadow-sm
            focus:outline-none focus:ring-2 focus:ring-[#c68b7e]"
          >
            Reservar
          </a>
        </div>
      </div>
    </div>
  );
}
