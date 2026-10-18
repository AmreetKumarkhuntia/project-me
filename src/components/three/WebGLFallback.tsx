// src/components/three/WebGLFallback.tsx — static sculpture fallback (design-v2 §6)

/**
 * Static pre-generated sculpture PNG with a slow CSS Ken Burns drift.
 * Content stays fully usable — 3D is atmosphere, never information.
 */
export default function WebGLFallback({
  src = "/sculpt-atrium.webp",
  alt = "",
  className = "",
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="animate-ken-burns absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
    </div>
  );
}
