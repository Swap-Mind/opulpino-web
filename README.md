# O'Pulpiño · web (demo)

Next.js 15 + Tailwind 4 + Framer Motion. Todas las páginas son estáticas.

- Desarrollo: `npm run dev -- -p 3100` → http://localhost:3100
- Producción: https://opulpino-web.vercel.app (proyecto de Vercel `opulpino-web`).
- Código: https://github.com/Swap-Mind/opulpino-web (rama `main`). Cada push a `main` publica en Vercel.

## Dónde se edita el contenido
- `src/lib/content.ts`: enlace de reservas, teléfono, email, sedes, horarios, fotos, reseñas y galería
- `src/lib/carta.ts`: carta, alérgenos, menú del día de cada sede y plan entre semana

## Idiomas
Español, inglés y gallego. Textos de interfaz en `src/lib/texts.ts`; contenido (sedes, carta) con los tres idiomas en cada campo.

## Reserva dentro de la web (ventana encima de la página)
Por defecto "Reservar" abre la app de reservas en una pestaña nueva. Para que se abra dentro de la web:
1. En la app de reservas (Vercel), variable `RESERVA_INCRUSTADA_ORIGENES` con los dominios de esta web, separados por comas
   (ej. `https://restauranteopulpino.es,https://www.restauranteopulpino.es,https://opulpino.vercel.app`) y desplegar la rama `feat/reserva-incrustada-web`.
2. En esta web (Vercel), variable `NEXT_PUBLIC_BOOKING_EMBED=1` y volver a desplegar.
Sin cualquiera de las dos, todo funciona como antes (pestaña nueva). La ventana siempre tiene "Abrir en pestaña nueva".

## Copias de seguridad
- `../opulpino-backup-v2-enlace-externo`: versión con enlace externo, antes de la ventana de reserva.
- `../opulpino-backup-v3-ventana-reserva`: versión con la ventana, antes de los ajustes de la app.
- `../opulpino-backup-v4-antes-colores`: versión con naranja, vídeo en portada y botones redondos.
- `../opulpino-backup-v5-antes-estilo-sencillo` y `../opulpino-backup-v6-antes-pulido`: versiones anteriores al estilo sencillo y al pulido final.
- App de reservas: etiqueta git `backup/antes-reserva-incrustada-2026-11-06`.

## Tipografía e imágenes
- Títulos: Cormorant Garamond (600; cursiva 500). Texto: Jost.
- Fotos en `public/img` (máx. 1800 px, JPEG progresivo) con miniatura borrosa en `src/lib/fotos.json`; se muestran con `<Foto>` (next/image). Para añadir o cambiar fotos, volver a generar ese archivo.

## Paleta
Pizarra `#121211`, tiza `#F4EFE6`, acento ouro vello `#C9A45C` (bronce `#80612A` sobre fondos claros, automático en `.bg-tiza`), atlántico `#16313A`. Tokens en `src/app/globals.css`.

## Pendiente antes de publicar
- Fotos provisionales (Unsplash, licencia libre): llevan la etiqueta "Foto provisional · por recibir del cliente". Sustituir por fotos reales y quitar `provisional: true` en `src/lib/carta.ts` / `content.ts`.
- Reseñas: se muestran puntuación y número reales de Google por sede (consultados el 6/11/2026). Para mostrar textos de reseñas, usar un widget oficial de reseñas de Google conectado al perfil del cliente.
- Horarios: tomados de Google Maps (6/11/2026). Confirmar con el cliente (menú del día y plan entre semana dicen L-V, pero Alcalá cierra los miércoles y Ensanche los lunes).
- Fotos del restaurante: se cargan desde restauranteopulpino.es; conviene copiarlas a `public/`.
- Redes sociales: poner los enlaces reales.
- Legal: completar razón social, CIF y domicilio.
- Formularios: ahora abren el correo del usuario; se pueden conectar a un envío real.
