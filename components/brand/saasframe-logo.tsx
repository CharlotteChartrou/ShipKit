import { useId, type HTMLAttributes, type SVGProps } from "react";
import { cn } from "@/utils/cn";
import type { Locale } from "@/lib/i18n";
import { getLocaleCopy } from "@/lib/i18n";

interface SaaSFrameMarkProps extends SVGProps<SVGSVGElement> {
  decorative?: boolean;
}

export function SaaSFrameMark({
  className,
  decorative = true,
  ...props
}: SaaSFrameMarkProps) {
  const gradientId = useId();

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
      <defs>
        <linearGradient id={gradientId} x1="8" x2="40" y1="8" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="14" fill={`url(#${gradientId})`} />
      <rect
        x="13"
        y="13"
        width="22"
        height="22"
        rx="7"
        fill="rgba(255,255,255,0.18)"
        stroke="white"
        strokeWidth="1.6"
      />
      <path d="M18 24H30" stroke="white" strokeLinecap="round" strokeWidth="2.4" />
      <path d="M24 18V30" stroke="white" strokeLinecap="round" strokeWidth="2.4" />
      <circle cx="34" cy="14" r="3.2" fill="#A5F3FC" />
    </svg>
  );
}

interface SaaSFrameLogoProps extends HTMLAttributes<HTMLDivElement> {
  iconClassName?: string;
  locale?: Locale;
  wordmarkClassName?: string;
  withTagline?: boolean;
}

export function SaaSFrameLogo({
  className,
  iconClassName,
  locale = "en",
  wordmarkClassName,
  withTagline = false,
  ...props
}: SaaSFrameLogoProps) {
  const copy = getLocaleCopy(locale);

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <SaaSFrameMark className={cn("h-10 w-10 shrink-0", iconClassName)} />
      <div className="min-w-0">
        <p
          className={cn(
            "text-sm font-semibold tracking-[-0.03em] text-slate-900 dark:text-white",
            wordmarkClassName,
          )}
        >
          SaaSFrame
        </p>
        {withTagline ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">{copy.brand.tagline}</p>
        ) : null}
      </div>
    </div>
  );
}
