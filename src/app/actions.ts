"use server";

import { projectSchema, type Project } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";

type CreateProjectActionResult =
  | { success: true }
  | { success: false; error: string };

export async function createProjectAction(
  values: Project
): Promise<CreateProjectActionResult> {
  const parsed = projectSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Invalid project data." };
  }

  const { error } = await supabase.from("projects").insert(parsed.data);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
