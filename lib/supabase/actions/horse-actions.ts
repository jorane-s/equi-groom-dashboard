"use server";

import { Horse, NewHorse } from "@/lib/models/horse";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ResponseModel } from "@/lib/models/action";

export async function getHorses(): Promise<ResponseModel<Horse[]>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("horses")
    .select("*, owner:profiles(firstName, lastName)");

  if (error) {
    return { success: false };
  }
  return { success: true, data: data ?? [] };
}

export async function createHorse(
  horse: NewHorse,
): Promise<ResponseModel<Horse>> {
  const supabase = await createClient();
  const { error, data } = await supabase.from("horses").insert(horse);
  if (error) {
    console.error(error);
    return { success: false };
  }
  revalidatePath("/dashboard/horses");
  return { success: true, data: data ?? undefined };
}
