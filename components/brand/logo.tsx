import { Music2 } from "lucide-react";

import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  showWordmark?: boolean;
};

/**
 * Marca compacta em SVG + texto, usada no header e no rodapé.
 */
export function BrandLogo({ className, showWordmark = true }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl shadow-sm"
        aria-hidden="true"
      >
        <Music2 className="size-5" strokeWidth={2.25} />
      </span>
      {showWordmark ? (
        <span className="font-heading text-foreground text-lg tracking-tight">
          {APP_NAME}
        </span>
      ) : (
        <span className="sr-only">{APP_NAME}</span>
      )}
    </span>
  );
}
