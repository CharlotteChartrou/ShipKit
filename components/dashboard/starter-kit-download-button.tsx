"use client";

import { Button } from "@/components/ui/button";

interface StarterKitDownloadButtonProps {
  label: string;
}

export function StarterKitDownloadButton({ label }: StarterKitDownloadButtonProps) {
  return (
    <Button
      onClick={() => {
        window.location.href = "/starter-kit.zip";
      }}
      type="button"
    >
      {label}
    </Button>
  );
}
