"use client";

import { useEffect } from "react";

export default function HideReservaBoxOnInternalPages() {
  useEffect(() => {
    // Simple check: if marker div exists, allow caja_reservacion to show
    // If marker div doesn't exist, hide caja_reservacion
    const handleVisibility = () => {
      const marker = document.querySelector('#mostrar-caja-reservas');
      const cajaReservacion = document.querySelector('#caja_reservacion');

      if (marker && cajaReservacion) {
        // On homepage with marker - ensure caja_reservacion is visible
        cajaReservacion.classList.remove('ocultar');
      } else if (cajaReservacion) {
        // On internal pages without marker - hide caja_reservacion
        cajaReservacion.classList.add('ocultar');
      }
    };

    // Initial check
    handleVisibility();

    // Observer to handle cases where caja_reservacion is created after our check
    const observer = new MutationObserver(() => {
      handleVisibility();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
