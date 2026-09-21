import { HorsesTable } from "@/components/horse-table";
import { getHorses } from "@/lib/supabase/actions/horse-actions";
import { AddHorseModal } from "@/components/add-horse-modal";
import { getUsersName } from "@/lib/supabase/actions/user-actions";

export default async function HorsesPage() {
  const horsesResponse = await getHorses();
  const usersResponse = await getUsersName();
  if (horsesResponse.data && usersResponse.data) {
    return (
      <>
        <HorsesTable horses={horsesResponse.data}></HorsesTable>
        <AddHorseModal usersName={usersResponse.data}></AddHorseModal>
      </>
    );
  } else {
    return <></>;
  }
}
