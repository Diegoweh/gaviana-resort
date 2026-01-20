"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    // Cambiar entre es y en
    const newLocale = locale === 'es' ? 'en' : 'es';

    // Obtener el pathname sin el locale actual
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');

    // Navegar a la nueva ruta con el nuevo locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  return (
    <button
      onClick={switchLanguage}
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-[#c68b7e] hover:bg-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c68b7e]"
      aria-label={`Switch to ${locale === 'es' ? 'English' : 'Español'}`}
      title={`Switch to ${locale === 'es' ? 'English' : 'Español'}`}
    >
      <Globe size={18} />
      <span className="uppercase font-semibold">{locale === 'es' ? 'EN' : 'ES'}</span>
    </button>
  );
}
