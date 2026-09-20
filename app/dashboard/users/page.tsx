import { Badge } from "@/components/ui/badge";
import { getUsers } from "@/lib/supabase/actions/user-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddProfileModal } from "@/components/add-profile-modal";

export default async function UsersPage() {
  const users = await getUsers();
  console.log(users);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Utilisateurs</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </CardTitle>
              <Badge variant="outline">{user.horses.length} Chevaux</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">✉️ {user.email}</p>
              {user.phone && (
                <p className="text-muted-foreground">📞 {user.phone}</p>
              )}

              <div className="pt-2">
                <p className="font-medium text-xs uppercase text-muted-foreground mb-1">
                  Chevaux :
                </p>
                {user.horses.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {user.horses.map((horse) => (
                      <li key={horse.id}>
                        <span className="font-medium">{horse.name}</span>
                        {horse.breed && ` (${horse.breed})`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-amber-600 italic">Aucun cheval</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddProfileModal></AddProfileModal>
    </div>
  );
}
