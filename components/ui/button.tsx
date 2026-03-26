import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: false;
  children: ReactNode;
}

interface ButtonAsLinkProps {
  asChild: true;
  children: ReactElement<{ className?: string }>;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export type ButtonProps = (ButtonAsButtonProps | ButtonAsLinkProps) & {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#4F46E5,#7C3AED)] text-white shadow-[0_16px_36px_rgba(79,70,229,0.28)] hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(79,70,229,0.32)] dark:shadow-[0_14px_34px_rgba(79,70,229,0.24)]",
  secondary:
    "bg-white/90 text-slate-900 ring-1 ring-inset ring-[rgba(99,102,241,0.14)] shadow-[0_10px_28px_rgba(79,70,229,0.08)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_34px_rgba(79,70,229,0.12)] dark:bg-white/10 dark:text-white dark:ring-white/10 dark:shadow-none dark:hover:bg-white/14",
  ghost:
    "bg-transparent text-slate-600 hover:bg-[rgba(79,70,229,0.08)] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/6 dark:hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-sm",
};

export function Button({
  asChild = false,
  className,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-2xl font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 dark:focus-visible:ring-white/60 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (asChild) {
    if (!isValidElement(props.children)) {
      return <span className={classes}>{props.children}</span>;
    }

    const child = props.children as ReactElement<{ className?: string }>;

    return cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  const buttonProps = props as ButtonAsButtonProps;
  const { children, type = "button", ...nativeProps } = buttonProps;

  return (
    <button className={classes} type={type} {...nativeProps}>
      {children}
    </button>
  );
}
