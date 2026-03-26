"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/button";

type NativeButtonProps = Extract<ButtonProps, { asChild?: false }>;

interface SubmitButtonProps extends Omit<NativeButtonProps, "type"> {
  pendingLabel?: string;
}

export function SubmitButton({
  children,
  pendingLabel = "Working...",
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending || props.disabled} type="submit">
      {pending ? pendingLabel : children}
    </Button>
  );
}
