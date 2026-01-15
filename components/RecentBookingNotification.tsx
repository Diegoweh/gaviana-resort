"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Users } from "lucide-react";

const names = [
  "José", "María", "Carlos", "Ana", "Luis", "Laura", "Miguel", "Sofia",
  "Fernando", "Carmen", "Roberto", "Isabel", "Diego", "Patricia", "Jorge",
  "Gabriela", "Ricardo", "Valentina", "Alejandro", "Daniela", "Antonio",
  "Camila", "Francisco", "Elena", "Manuel", "Andrea", "Raúl", "Mónica",
  "Pedro", "Lucía", "Javier", "Natalia", "Sebastián", "Mariana", "Pablo",
  "Victoria", "Enrique", "Fernanda", "César", "Paola", "Óscar", "Renata",
  "Guillermo", "Claudia", "Arturo", "Beatriz", "Héctor", "Adriana", "Rodrigo",
  "Jimena", "Emilio", "Valeria", "Ramón", "Carolina", "Alberto", "Cristina",
  "Eduardo", "Silvia", "Martín", "Rosa", "Rafael", "Verónica", "Andrés",
  "Diana", "Sergio", "Martha", "Leonardo", "Teresa", "Gustavo", "Lorena"
];

const cities = [
  "Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Tijuana",
  "León", "Querétaro", "Mérida", "San Luis Potosí", "Hermosillo",
  "Cancún", "Los Cabos", "Puerto Vallarta", "Playa del Carmen", "Oaxaca",
  "Guanajuato", "Morelia", "Aguascalientes", "Toluca", "Veracruz",
  "Chihuahua", "Manzanillo", "Tulum", "Cuernavaca", "Durango", "Saltillo",
  "Culiacán", "Acapulco", "Pachuca", "Zacatecas", "Colima", "Tuxtla Gutiérrez",
  "Villahermosa", "Campeche", "Xalapa", "Irapuato", "Celaya", "Tepic"
];

interface RecentBookingNotificationProps {
  roomTitle: string;
}

export default function RecentBookingNotification({ roomTitle }: RecentBookingNotificationProps) {
  const [notification, setNotification] = useState<{
    name: string;
    city: string;
    minutes: number;
  } | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Genera una notificación aleatoria cuando el componente se monta
    const generateNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomMinutes = Math.floor(Math.random() * 30) + 1; // Entre 1 y 30 minutos

      setNotification({
        name: randomName,
        city: randomCity,
        minutes: randomMinutes,
      });

      // Muestra la notificación después de un pequeño delay
      setTimeout(() => setShow(true), 500);
    };

    generateNotification();

    // Cambia la notificación cada 10 segundos
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(generateNotification, 500);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (!notification) return null;

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-200 shadow-lg"
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-teal-400/10 to-cyan-400/10 animate-pulse" />

          {/* Decorative wave pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-5"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="booking-waves"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 50 Q25 25 50 50 T100 50 M0 70 Q25 45 50 70 T100 70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#booking-waves)" />
          </svg>

          <div className="relative p-6 md:p-8">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-emerald-500/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-sm">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Users className="w-3.5 h-3.5" />
                    </motion.div>
                    Reservación reciente
                  </span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl font-bold text-gray-800 leading-tight"
                >
                  <span className="text-emerald-600">{notification.name}</span>{" "}
                  {notification.city && (
                    <span className="text-gray-600 text-base font-normal">
                      de {notification.city}
                    </span>
                  )}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-700 text-sm md:text-base"
                >
                  acaba de reservar{" "}
                  <span className="font-semibold text-gray-900">
                    {roomTitle}
                  </span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-2 text-xs md:text-sm text-emerald-700 font-medium"
                >
                  <div className="flex items-center gap-1">
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-emerald-500"
                    />
                    <span>Hace {notification.minutes} minuto{notification.minutes !== 1 ? "s" : ""}</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
