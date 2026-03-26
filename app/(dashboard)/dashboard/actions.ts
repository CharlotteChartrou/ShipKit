"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createProjectForCurrentUser } from "@/lib/projects";
import { getCurrentAppUser } from "@/lib/users";

// Use this file as the template for new dashboard feature actions.
export async function createProjectAction(formData: FormData) {
  const appUser = await getCurrentAppUser();

  if (!appUser) {
    redirect("/login?next=/dashboard");
  }

  const rawName = formData.get("name");
  const name = typeof rawName === "string" ? rawName.trim() : "";

  if (!name) {
    return;
  }

  await createProjectForCurrentUser(name.slice(0, 80));
  revalidatePath("/dashboard");
}
