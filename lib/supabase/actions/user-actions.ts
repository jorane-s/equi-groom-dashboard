"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { NewUser, User } from "@/lib/models/user";

export async function getUsers(): Promise<User[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
     *,
      horses:horses (
        id,
        name,
        breed,
        birthDate
      )
    `,
    )
    .eq("role", "USER");
  if (error) {
    console.error(error);
  }
  return data ?? [];
}

export async function getUsersName(): Promise<
  { id: string; firstName: string; lastName: string }[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, firstName, lastName")
    .eq("role", "USER");

  if (error) {
    console.error(error);
  }
  return data ?? [];
}

export async function createUser(user: NewUser): Promise<{ success: boolean }> {
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").insert(user);
  if (error) {
    console.error("Détails de l'erreur :", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return { success: false };
  }
  revalidatePath("/");
  return { success: true };
}
