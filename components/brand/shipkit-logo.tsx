import { useId, type HTMLAttributes, type SVGProps } from "react";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { getLocaleCopy } from "@/lib/i18n";

interface ShipKitMarkProps extends SVGProps<SVGSVGElement> {
  decorative?: boolean;
}

export function ShipKitMark({ className, decorative = true, ...props }: ShipKitMarkProps) {
  const accentId = useId();

  return (
    <svg
      aria-hidden={decorative}
      className={className}
      fill="none"
      role={decorative ? "presentation" : "img"}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="4" y="4" width="40" height="40" rx="13" fill="#0F172A" />
      <path
        d="M15 29.5L23 17H29L21 29.5H15ZM22.5 31H30.5L34 25.5H26L22.5 31Z"
        fill="white"
      />
      <rect id={accentId} x="30.5" y="17" width="4" height="4" rx="1.5" fill="#38BDF8" />
    </svg>
  );
}

interface ShipKitLogoProps extends HTMLAttributes<HTMLDivElement> {
  iconClassName?: string;
  locale?: Locale;
  wordmarkClassName?: string;
  withTagline?: boolean;
}

export function ShipKitLogo({
  className,
  iconClassName,
  locale = "en",
  wordmarkClassName,
  withTagline = false,
  ...props
}: ShipKitLogoProps) {
  const copy = getLocaleCopy(locale);

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <ShipKitMark className={cn("h-10 w-10 shrink-0", iconClassName)} />
      <div className="min-w-0">
        <p className={cn("text-sm font-semibold tracking-[-0.02em] text-slate-950 dark:text-white", wordmarkClassName)}>
          ShipKit
        </p>
        {withTagline ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">{copy.brand.tagline}</p>
        ) : null}
      </div>
    </div>
  );
}
