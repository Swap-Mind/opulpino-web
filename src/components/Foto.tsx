import Image from "next/image";
import fotos from "@/lib/fotos.json";

type Meta = { w: number; h: number; blur: string };
const META = fotos as Record<string, Meta>;

// Foto optimizada (next/image: tamaño justo por pantalla, WebP/AVIF, carga
// diferida) con miniatura borrosa mientras llega. Por defecto rellena su caja:
// el padre necesita `relative` y un tamaño (aspect-*, h-*).
export default function Foto({
  src,
  alt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className = "",
  priority = false,
  fill = true,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const meta = META[src];
  const blur = meta ? { placeholder: "blur" as const, blurDataURL: meta.blur } : {};
  if (fill) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} {...blur} />;
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={meta?.w ?? 1600}
      height={meta?.h ?? 1200}
      sizes={sizes}
      priority={priority}
      className={className}
      {...blur}
    />
  );
}
