import Link from "next/link";
import { Container } from "@/components/shared/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(99,102,241,0.12)] bg-[rgba(255,255,255,0.72)] py-8 dark:border-white/10 dark:bg-[rgba(10,14,28,0.72)]">
      <Container className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>SaaSFrame</p>
        <nav className="flex flex-wrap items-center gap-4">
          <Link className="hover:text-slate-950 dark:hover:text-white" href="/legal">
            Legal notice
          </Link>
          <Link className="hover:text-slate-950 dark:hover:text-white" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-slate-950 dark:hover:text-white" href="/terms">
            Terms
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
