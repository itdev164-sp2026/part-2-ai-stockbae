"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authSchema, type AuthCredentials, projectSchema, type Project } from "@/lib/schemas";
import { createSupabaseServerActionClient } from "@/lib/supabase/server";

type CreateProjectActionResult =
  | { success: true }
  | { success: false; error: string };

export type AuthActionState = {
  error: string | null;
  success: string | null;
};

export async function createProjectAction(
  values: Project
): Promise<CreateProjectActionResult> {
  const parsed = projectSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Invalid project data." };
  }

  const supabase = await createSupabaseServerActionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "You must be signed in to create a project." };
  }

  const { error } = await supabase.from("projects").insert(parsed.data);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/projects");

  return { success: true };
}

export async function signInAction(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid credentials.", success: null };
  }

  const supabase = await createSupabaseServerActionClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.message, success: null };
  }

  redirect("/projects");
}

export async function signUpAction(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid credentials.", success: null };
  }

  const supabase = await createSupabaseServerActionClient();
  const { data, error } = await supabase.auth.signUp(parsed.data satisfies AuthCredentials);

  if (error) {
    return { error: error.message, success: null };
  }

  if (data.session) {
    redirect("/projects");
  }

  return {
    error: null,
    success: "Account created. Check your email to confirm your sign-up.",
  };
}

export async function signOutAction() {
  const supabase = await createSupabaseServerActionClient();

  await supabase.auth.signOut();
  redirect("/login");
}
