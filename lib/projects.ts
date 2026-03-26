import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase";
import { getCurrentAppUser } from "@/lib/users";
import type { Project } from "@/types/project";

function isMissingProjectsTableError(message: string) {
  return (
    message.includes("Could not find the table 'public.projects'") ||
    message.includes("relation \"public.projects\" does not exist")
  );
}

// Feature helpers live here. Use this file as the pattern for adding new data-backed modules.
export async function getProjectsForCurrentUser() {
  const appUser = await getCurrentAppUser();

  if (!appUser) {
    return {
      projects: [] as Project[],
      setupRequired: false,
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, created_at, user_id")
    .eq("user_id", appUser.id)
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingProjectsTableError(error.message)) {
      return {
        projects: [] as Project[],
        setupRequired: true,
      };
    }

    throw new Error(error.message);
  }

  return {
    projects: (data ?? []) as Project[],
    setupRequired: false,
  };
}

export async function createProjectForCurrentUser(name: string) {
  const appUser = await getCurrentAppUser();

  if (!appUser) {
    throw new Error("You must be signed in to create a project.");
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("projects").insert({
    name,
    user_id: appUser.id,
  });

  if (error) {
    if (isMissingProjectsTableError(error.message)) {
      throw new Error(
        "Missing Supabase table: public.projects. Apply the projects migration before using the demo feature.",
      );
    }

    throw new Error(error.message);
  }
}
