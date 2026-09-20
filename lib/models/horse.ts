import { User } from "@/lib/models/user";

export interface Horse {
  id: string;
  name: string;
  breed: string;
  coat: string;
  birthDate: string;
  created_at: string;
  ownerId: string | null;
  owner?: User;
}

export interface NewHorse {
  name: string;
  breed: string;
  coat: string;
  birthDate: string;
  ownerId: string | null;
}
