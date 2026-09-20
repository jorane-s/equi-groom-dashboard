import { HorsesTable } from "@/components/ui/horse-table";
import { getHorses } from "@/lib/supabase/actions/horse-actions";
import { AddHorseModal } from "@/components/add-horse-modal";
import { getUsersName } from "@/lib/supabase/actions/user-actions";

export default async function HorsesPage() {
  const allHorses = await getHorses();
  const usersName = await getUsersName();
  console.log(usersName);
  return (
    <>
      <HorsesTable horses={allHorses}></HorsesTable>
      <AddHorseModal usersName={usersName}></AddHorseModal>
    </>
  );
}
