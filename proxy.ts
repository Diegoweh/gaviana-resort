import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Listado de idiomas soportados
  locales,

  // Idioma por defecto cuando el usuario visita "/"
  defaultLocale,

  // Siempre usar prefijo de locale en la URL
  localePrefix: 'always',
});

export const config = {
  // Coincidir solo con rutas internacionalizadas
  matcher: [
    // Habilitar redirects para todas las rutas
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/',
  ],
};
