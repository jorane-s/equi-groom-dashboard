"use server";

import { Horse, NewHorse } from "@/lib/models/horse";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getHorses(): Promise<Horse[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("horses")
    .select("*, owner:profiles(firstName, lastName)");
  return data ?? [];
}

export async function getHorsesById(id: number) {}

export async function createHorse(horse: NewHorse) {
  const supabase = await createClient();
  const { error } = await supabase.from("horses").insert(horse);
  if (error) {
    console.error("Détails de l'erreur :", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw error;
  }
  revalidatePath("/");
}
