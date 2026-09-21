"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { NewUser, User } from "@/lib/models/user";
import { ResponseModel } from "@/lib/models/action";

export async function getUsers(): Promise<ResponseModel<User[]>> {
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
    return { success: false };
  }
  return { success: true, data: data ?? [] };
}

export async function getUsersName(): Promise<
  ResponseModel<{ id: string; firstName: string; lastName: string }[]>
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, firstName, lastName")
    .eq("role", "USER");

  if (error) {
    console.error(error);
    return { success: false };
  }
  return { success: true, data: data ?? [] };
}

export async function createUser(user: NewUser): Promise<ResponseModel<User>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").insert(user);
  if (error) {
    console.error(error);
    return { success: false };
  }
  revalidatePath("/dashboard/users");
  return { success: true, data: data ?? undefined };
}
