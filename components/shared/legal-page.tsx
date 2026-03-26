import type { ReactNode } from "react";
import { Container } from "@/components/shared/container";

interface LegalPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function LegalPage({ children, description, title }: LegalPageProps) {
  return (
    <main>
      <Container className="max-w-4xl space-y-8 pb-20 pt-10 sm:pt-16">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Legal</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        <div className="space-y-8 text-sm leading-7 text-slate-700 dark:text-slate-300">
          {children}
        </div>
      </Container>
    </main>
  );
}
