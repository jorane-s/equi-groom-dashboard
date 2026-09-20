import { Horse } from "@/lib/models/horse";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  horses: Horse[];
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}
