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
import { NewUser } from "@/lib/models/user";
import { createUser } from "@/lib/supabase/actions/user-actions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

const createUserSchema = z.object({
  firstName: z.string().min(2, "Prénom trop court (min. 2 caractères)"),
  lastName: z.string().min(2, "Nom trop court (min. 2 caractères)"),
  email: z.string().min(1, "L'email est obligatoire").email(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val === "" || phoneRegex.test(val), {
      message: "Numéro invalide (ex: 0612345678 ou +33612345678)",
    }),
});

type CreateUserInput = z.infer<typeof createUserSchema>;

export function AddProfileModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateUserInput>({
    mode: "onBlur",
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: CreateUserInput) => {
    setLoading(true);
    const profile: NewUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    };

    const result = await createUser(profile);

    if (result?.success) {
      reset();
      setOpen(false);
      toast.success("Profil ajouté !");
    } else {
      toast.error("Impossible d'ajouter le profil.");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="bg-orange-500 hover:bg-orange-600">
            <PlusCircle className="mr-2 h-4 w-4" /> Ajouter un profil
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouveau profil</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" required {...register("firstName")} />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" {...register("lastName")} required />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" {...register("email")} required />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
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
