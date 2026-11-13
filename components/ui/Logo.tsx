import { LOGO } from "@/lib/photos";

// His mascot logo. Small source file: never render it taller than 200px.
export function Logo({
  className = "",
  priority = false,
  decorative = false,
  small = false,
}: {
  className?: string;
  priority?: boolean;
  decorative?: boolean;
  // Nav size. Uses a lighter file.
  small?: boolean;
}) {
  return (
    <img
      src={small ? LOGO.small : LOGO.webp}
      width={LOGO.width}
      height={LOGO.height}
      alt={decorative ? "" : LOGO.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`w-auto ${className}`}
    />
  );
}
