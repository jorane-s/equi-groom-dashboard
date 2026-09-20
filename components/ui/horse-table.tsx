import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Horse } from "@/lib/models/horse";

export function HorsesTable({ horses }: { horses: Horse[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Race</TableHead>
          <TableHead>Robe</TableHead>
          <TableHead>Date de naissance</TableHead>
          <TableHead>Date de création</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {horses.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-slate-500 py-6">
              Aucun cheval enregistré pour le moment.
            </TableCell>
          </TableRow>
        ) : (
          horses.map((horse) => (
            <TableRow key={horse.id}>
              <TableCell className="font-semibold text-slate-800">
                {horse.name}
              </TableCell>
              <TableCell>{horse.breed}</TableCell>
              <TableCell>{horse.coat}</TableCell>
              <TableCell>
                {new Date(horse.birthDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(horse.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800"
                >
                  Actif
                </Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
