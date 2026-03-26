"use client";

import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { hasSupabaseEnv } from "@/lib/env";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type AuthStatus = "authenticated" | "unauthenticated";

export interface AuthContextValue {
  session: Session | null;
  status: AuthStatus;
  supabase: SupabaseClient | null;
  user: User | null;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps extends PropsWithChildren {
  initialSession: Session | null;
}

export function AuthProvider({ children, initialSession }: AuthProviderProps) {
  const [supabase] = useState(() => (hasSupabaseEnv ? createBrowserSupabaseClient() : null));
  const [session, setSession] = useState<Session | null>(initialSession);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value: AuthContextValue = {
    session,
    status: session?.user ? "authenticated" : "unauthenticated",
    supabase,
    user: session?.user ?? null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
