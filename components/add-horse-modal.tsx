"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Loader2, Text } from "lucide-react";
import { createHorse } from "@/lib/supabase/actions/horse-actions";
import { toast } from "sonner";
import { Horse, NewHorse } from "@/lib/models/horse";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface AddHorseModalProps {
  usersName: { id: string; firstName: string; lastName: string }[];
}
export function AddHorseModal({ usersName }: AddHorseModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    const horse: NewHorse = {
      name: formData.get("name") as string,
      birthDate: formData.get("birthDate") as string,
      breed: formData.get("breed") as string,
      coat: formData.get("coat") as string,
      height: formData.get("height"),
      ownerId: formData.get("ownerId") as string,
    };
    const response = await createHorse(horse);
    if (response.success) {
      toast.success("Cheval ajouté !");
      setOpen(false);
    } else {
      toast.error("Impossible d'ajouter le cheval.");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="bg-orange-500 hover:bg-orange-600">
            <PlusCircle className="mr-2 h-4 w-4" /> Ajouter un cheval
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouveau cheval</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du cheval</Label>
            <Input id="name" name="name" required placeholder="ex: Spirit" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="breed">Race</Label>
            <Input
              id="breed"
              name="breed"
              required
              placeholder="ex: Selle Français"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner">Robe</Label>
            <Input id="coat" name="coat" required placeholder="ex: Alezan" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Hauteur en cm (au garrot)</Label>
            <Input type="number" id="height" name="height" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Date de naissance</Label>
            <Input type="date" id="birthDate" name="birthDate" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerId">Propriétaire</Label>
            <Select
              id="ownerId"
              name="ownerId"
              required
              items={usersName.map((user) => {
                return {
                  label: user.firstName + " " + user.lastName,
                  value: user.id,
                };
              })}
            >
              <SelectTrigger className="w-45">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {usersName.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.firstName + " " + item.lastName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Enregistrement...
                </>
              ) : (
                "Enregistrer"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
