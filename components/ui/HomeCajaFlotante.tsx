"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

declare global {
  interface Window {
    datosHotel: {
      init: (args: any[]) => void;
      valor: (i: number) => any;
      _args?: any[];
    };
    inicializarCajaFlotante?: () => void;
  }
}

export default function HomeCajaFlotante() {
  const locale = useLocale();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // === CONFIGURAR EVENT DELEGATION INMEDIATAMENTE (antes de cargar el script) ===
    // Esto asegura que los botones funcionen desde el primer momento

    // Remover clases is-active de los botones para resetear el estado
    const buttons = document.querySelectorAll('.activar-menu-mobil, .menu-item-3397');
    buttons.forEach(btn => {
      btn.classList.remove('is-active');
    });

    // Usar event delegation en el document para los botones que abren el carrito
    // Esto evita problemas con React y los elementos clonados
    const handleDocumentClick = (e: Event) => {
      const target = e.target as HTMLElement;

      // Verificar si el click es en un botón que abre el carrito
      if (target.closest('.activar-menu-mobil, .menu-item-3397')) {
        e.preventDefault();
        e.stopImmediatePropagation(); // IMPORTANTE: Prevenir que otros handlers se ejecuten
        const button = target.closest('.activar-menu-mobil, .menu-item-3397') as HTMLElement;
        const contenedorCarrito = document.querySelector<HTMLElement>('#contenedor-carrito-lateral');
        const carritoLateral = document.querySelector<HTMLElement>('#carrito-lateral');

        if (!contenedorCarrito || !carritoLateral) {
          console.log("No se encontró el carrito lateral, aún no se ha inicializado");
          return;
        }

        if (button.classList.contains("is-active")) {
          button.classList.remove("is-active");
          contenedorCarrito.style.display = 'none';
          carritoLateral.style.display = 'none';
        } else {
          // Remover is-active de todos los botones
          document.querySelectorAll('.activar-menu-mobil, .menu-item-3397').forEach(btn => {
            btn.classList.remove('is-active');
          });
          button.classList.add("is-active");
          contenedorCarrito.style.display = 'block';
          carritoLateral.style.display = 'block';
        }
        return;
      }

      // Verificar si el click es en un botón de cerrar
      if (target.closest('.cerrar-cart')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        document.querySelectorAll('.carrito_detalle').forEach(function (detail) {
          (detail as HTMLElement).classList.remove('is-active');
        });
        document.querySelectorAll('.activar-menu-mobil, .menu-item-3397').forEach(function (clase) {
          (clase as HTMLElement).classList.remove('is-active');
        });
        const contenedorCarrito = document.querySelector<HTMLElement>('#contenedor-carrito-lateral');
        const carritoLateral = document.querySelector<HTMLElement>('#carrito-lateral');
        if (contenedorCarrito) contenedorCarrito.style.display = 'none';
        if (carritoLateral) carritoLateral.style.display = 'none';
        return;
      }

      // Verificar si el click es fuera del carrito (en el contenedor)
      if (target.id === 'contenedor-carrito-lateral') {
        document.querySelectorAll('.activar-menu-mobil, .menu-item-3397').forEach(function (clase) {
          (clase as HTMLElement).classList.remove('is-active');
        });
        const contenedorCarrito = document.querySelector<HTMLElement>('#contenedor-carrito-lateral');
        const carritoLateral = document.querySelector<HTMLElement>('#carrito-lateral');
        if (contenedorCarrito) contenedorCarrito.style.display = 'none';
        if (carritoLateral) carritoLateral.style.display = 'none';
      }
    };

    // Remover el event listener anterior si existe
    document.removeEventListener('click', (window as any)._bookingHandler);

    // Guardar referencia al handler para poder removerlo después
    (window as any)._bookingHandler = handleDocumentClick;

    // Agregar el nuevo event listener INMEDIATAMENTE con capture para que se ejecute primero
    document.addEventListener('click', handleDocumentClick, { capture: true });

    console.log("Event delegation configurado INMEDIATAMENTE para botones de reservación");

    // === FIN CONFIGURACIÓN EVENT DELEGATION ===

    // Solo eliminar el DOM si NO es el mount inicial (es un cambio de idioma)
    if (!isInitialMount.current) {
      console.log("Cambio de idioma detectado, eliminando DOM existente");

      // Resetear el flag de inicialización del script externo para permitir re-inicialización
      (window as any)._cajaFlotanteInicializada = false;

      // Eliminar el DOM existente de la caja de reservaciones para recrearlo
      const existingCaja = document.getElementById('caja_reservacion');
      if (existingCaja) {
        existingCaja.remove();
      }

      const existingCarrito = document.getElementById('contenedor-carrito-lateral');
      if (existingCarrito) {
        existingCarrito.remove();
      }

      const existingCarrito2 = document.getElementById('carrito-lateral');
      if (existingCarrito2) {
        existingCarrito2.remove();
      }
    } else {
      console.log("Mount inicial, no se elimina el DOM");
      isInitialMount.current = false;
    }

    const config = [
      3,
      [".menu-item-3397", ".r2k-reservar", ".r2k-reservar-habitacion"],
      locale,
      {
        subdominio: "booking.gaviana.com",
        posicion: {
          relacion: "",
          style:
            "position:absolute;z-index:30;left:50%;transform:translateX(-50%);calc(100% - 120px);width:800px;max-width:95vw;"
        },
        partes: {
          ".calendar>.header button": "padding: 15px 15px!important;"
        }
      }
    ];

    // Pre-configure datosHotel before the script loads
    if (!window.datosHotel) {
      window.datosHotel = {
        _args: config,
        init: function (Args: any[]) {
          this._args = Args;
        },
        valor: function (i: number) {
          return this._args?.[i];
        }
      };
    } else {
      // If already exists, just update the config
      window.datosHotel.init(config);
    }

    console.log("datosHotel configurado con valores:", window.datosHotel.valor(0), "locale:", locale);

    // Función para inicializar la caja (el event delegation ya está configurado arriba)
    const initCaja = () => {
      if (window.inicializarCajaFlotante) {
        console.log("Llamando inicializarCajaFlotante con locale:", locale);
        window.inicializarCajaFlotante();
      }
    };

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="/js/script_caja_flotante_lateral_n.js"]');
    if (existingScript) {
      // Script already exists, just call the init function
      initCaja();
      return;
    }

    // Load the script dynamically
    const script = document.createElement("script");
    script.src = "/js/script_caja_flotante_lateral_n.js";
    script.async = false; // Ensure it runs in order

    script.onload = () => {
      console.log("Script de caja flotante cargado exitosamente");
      // Llamar a la inicialización
      initCaja();
    };

    script.onerror = (error) => {
      console.error("Error cargando script de caja flotante:", error);
    };

    document.body.appendChild(script);
  }, [locale]);

  return null;
}
