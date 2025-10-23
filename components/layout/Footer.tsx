import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Side - Logo and Contact Info */}
            <div className="space-y-6">
              {/* Logo and Resort Name */}
              <div className="flex items-center gap-3">
                <div className="w-24 h-24 rounded flex items-center justify-center">
                  <Image
                    src="/img/gavLogo.svg"
                    alt="Gaviana Resort Logo"
                    title="Gaviana Resort Mazatlán"
                    width={96}
                    height={96}
                  />
                </div>
                {/* <h3 className="text-xl font-semibold">Gaviana Resort Mazatlán</h3> */}
              </div>

              {/* Address */}
              <div className="space-y-1 text-gray-300">
                <p>Av. Playa Gaviotas 100, Zona Dorada, 82110</p>
                <p>Mazatlán, Sinaloa.</p>
                <p className="text-orange-400">reservaciones@gaviana.com</p>
              </div>

              {/* Phone Numbers */}
              <div className="space-y-1 text-gray-300">
                <p>
                  <span className="text-orange-400 font-medium">MX</span> 800 716 9700
                </p>
                <p>
                  <span className="text-orange-400 font-medium">CA</span> 1877 756 7532
                </p>
                <p>
                  <span className="text-orange-400 font-medium">US</span> 1 800 528 8760
                </p>
                <a
                title='Enviar mensaje por WhatsApp'
                href="https://wa.me/52XXXXXXXXXX?text=Hola%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-green-500"
                aria-label="Enviar mensaje por WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Mensaje de WhatsApp</span>
              </a>

              </div>
            </div>

            {/* Right Side - Legal Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Legales</h4>
              <div className="space-y-3">
                <a href="#" title='aviso' className="block text-gray-300 hover:text-white transition-colors">
                  Aviso de privacidad
                </a>
                <a href="#" title='terminos' className="block text-gray-300 hover:text-white transition-colors">
                  Términos y condiciones
                </a>
                <a href="#" title='facturacion' className="block text-gray-300 hover:text-white transition-colors">
                  Facturación
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-600 mt-12 pt-8 text-center text-gray-400">
            <p>2025 Gaviana Resort. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
