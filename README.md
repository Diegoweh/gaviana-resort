Proyecto Next.js

Este es un proyecto creado con Next.js usando create-next-app. Next.js es un framework de React para construir sitios web rápidos, modernos y optimizados.

Requisitos previos

Antes de iniciar, necesitas tener instalado:

1) Node.js (obligatorio)

Node.js es el entorno que permite ejecutar el proyecto y usar npm/yarn.

Descárgalo desde: https://nodejs.org

Recomendación: instala la versión LTS (la estable).

Para verificar que se instaló correctamente, abre tu terminal y corre:

node -v
npm -v


Si ves números de versión, todo está listo.

Instalación del proyecto

Descarga o clona este repositorio y abre la carpeta en tu editor (VS Code recomendado).

Instala las dependencias:

npm install
# o si usas yarn:
yarn install
# o pnpm:
pnpm install
# o bun:
bun install


Esto descargará todo lo necesario para que el proyecto funcione (Next, React, Embla Carousel, Tailwind, etc.)

Levantar el servidor en desarrollo

Para correr el proyecto de forma local:

npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev


Luego abre en tu navegador:

http://localhost:3000

Cada vez que guardes cambios en el código, la página se actualizará automáticamente.

Estructura básica

Puedes editar la página principal desde:

app/page.tsx

Ahí puedes agregar, quitar o mover componentes según tu contenido.

Componente: PromoSplitBanner

Este proyecto incluye un componente tipo banner slider llamado PromoSplitBanner.
Sirve para mostrar una o varias diapositivas (slides) con imagen de fondo, texto y botón de llamada a la acción.

¿Dónde está el componente?

Normalmente en:

components/PromoSplitBanner.tsx
(o la ruta que se te haya entregado en el proyecto)

Props (configuración disponible)

El componente recibe estas propiedades:

slides (obligatorio): lista de diapositivas.

height (opcional): altura del banner en desktop.
Default: "h-[420px]"

showTexture (opcional): muestra una textura de ondas en desktop.
Default: true

autoPlayInterval (opcional): tiempo en ms entre slides automáticos.
Default: 5000 (5 segundos)

Formato de cada slide

Cada objeto dentro de slides acepta:

{
  imageSrc: string;          // Imagen desktop
  mobileImageSrc?: string;   // Imagen mobile (opcional)
  title: string;             // Título principal
  kicker?: string;           // Línea secundaria (opcional)
  lines?: string[];          // Párrafos / bullets (opcional)
  ctaLabel?: string;         // Texto del botón (opcional)
  ctaHref?: string;          // Link del botón (opcional)
}

Ejemplo de uso

Colócalo en la página donde quieras mostrar el banner:

import PromoSplitBanner from "@/components/PromoSplitBanner";

export default function Page() {
  return (
    <PromoSplitBanner
      slides={[
        {
          imageSrc: "/img/sessonBanner.webp",
          mobileImageSrc: "/img/sessonBannerMobile.webp",
          title: "Semana Santa 2026",
          kicker: "Escápate al sol en Mazatlán",
          lines: [
            "Del 29 de marzo al 5 de abril, te espera Hotel Gaviana.",
            "Reserva ya y vive la pasión del puerto con vista al mar.",
            "¡Tu descanso perfecto está en Mazatlán!",
          ],
          ctaLabel: "Reservar",
          ctaHref: `https://wa.me/5216691234567?text=${encodeURIComponent(
            "Hola, quiero reservar para Semana Santa 2026 en Hotel Gaviana."
          )}`,
        },
        // Puedes agregar más slides aquí
      ]}
      height="h-[420px]"
      showTexture
      autoPlayInterval={5000}
    />
  );
}

Notas importantes

Si no agregas mobileImageSrc, se usará la misma imagen de desktop.

Si agregas más de 1 slide, aparecerán flechas de navegación y se activará el autoplay.

El botón (ctaLabel + ctaHref) es opcional; si no lo defines, esa slide no muestra CTA.

Deploy / Publicación

Este proyecto se puede publicar de dos formas:

Como sitio estático (recomendado si no usas servidores modernos).

En Vercel (opción moderna y automática).

Opción A) Deploy como sitio estático (sin servidor Node)

Si tu hosting solo permite subir archivos HTML/CSS/JS (por ejemplo cPanel, FTP, Nginx, Apache, S3, etc.), puedes generar una exportación estática de Next.js.

1) Habilitar exportación estática

En el archivo next.config.js agrega (o asegúrate de tener) esto:

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

module.exports = nextConfig;


Con esto Next.js preparará el proyecto para exportarse como HTML estático. 
nextjs.org
+2
nextjs.org
+2

2) Construir el proyecto

Corre:

npm run build


Al terminar, Next.js generará una carpeta llamada:

out/

Ahí están todos los archivos listos para subir a cualquier hosting estático. 
nextjs.org
+1

3) Subir a tu hosting

En tu servidor, abre la carpeta pública (por ejemplo public_html, www, htdocs, etc.).

Sube todo el contenido dentro de out/.

Asegúrate de que exista un index.html en la raíz de esa carpeta.

Eso es todo: tu sitio ya quedará publicado.

Importante: limitaciones del modo estático

Cuando usas output: "export", el proyecto no puede usar funciones que necesiten servidor Node, como:

API Routes / Route Handlers dinámicos

Server Side Rendering (SSR)

Rewrites / Redirects con lógica de servidor

Algunas funciones avanzadas de i18n

Optimización de imágenes de Next en runtime (a menos que uses loader externo) 
nextjs.org
+2
nextjs.org
+2

Este proyecto está pensado para funcionar bien como sitio estático si solo muestra contenido y componentes visuales.

Opción B) Deploy en Vercel (opcional)

Si en algún momento quieres un deploy automático con previews y CDN, puedes usar Vercel:

Crea una cuenta en Vercel.

Conecta este repositorio (GitHub / GitLab / Bitbucket).

Vercel detecta Next.js y hace deploy solo.

Docs oficiales:

Guía de deploy: Next.js + Vercel 
nextjs.org