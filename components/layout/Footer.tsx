'use client';

import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useTranslations, useLocale } from 'next-intl'

const Footer = () => {
  const t = useTranslations('footer');
  const locale = useLocale();

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
                    src="/img/logoFooter.png"
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
                <p>{t('address1')}</p>
                <p>{t('address2')}</p>
                <p className="text-orange-400">reservaciones@gaviana.com</p>
              </div>

              {/* Phone Numbers */}
              <div className="space-y-1 text-gray-300">
                <p>
                  <span className="text-orange-400 font-medium">MX</span>{' '}
                  <a href="tel:+528007169700" className="hover:text-white transition-colors">
                    800 716 9700
                  </a>
                </p>
                <p>
                  <span className="text-orange-400 font-medium">CA</span>{' '}
                  <a href="tel:+18777567532" className="hover:text-white transition-colors">
                    1877 756 7532
                  </a>
                </p>
                <p>
                  <span className="text-orange-400 font-medium">US</span>{' '}
                  <a href="tel:+18005288760" className="hover:text-white transition-colors">
                    1 800 528 8760
                  </a>
                </p>
                <a
                title={t('whatsappTitle')}
                href="https://wa.me/5216691527305?text=Hola%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-green-500"
                aria-label={t('whatsappTitle')}
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t('whatsappLabel')}</span>
              </a>

              </div>
            </div>

            {/* Right Side - Legal Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">{t('legalsTitle')}</h4>
              <div className="space-y-3">
                <a href={`/${locale}/aviso-privacidad`} title='aviso' className="block text-gray-300 hover:text-white transition-colors">
                  {t('privacyPolicy')}
                </a>
                <a href={`/${locale}/terminos-y-condiciones`} title='terminos' className="block text-gray-300 hover:text-white transition-colors">
                  {t('termsConditions')}
                </a>
                <a href="https://gaviana.merkatek.com/" title='facturacion' className="block text-gray-300 hover:text-white transition-colors">
                  {t('billing')}
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-600 mt-12 pt-8 text-center text-gray-400">
            <p>{t('copyright')}</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
