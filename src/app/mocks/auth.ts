import { users } from "./users";
import type { User } from "../types/users";

export type AuthUser = {
  username: string;
  password: string;
  userId: string;
};

export const authUsers: AuthUser[] = [
  {
    username: "admin.liga",
    password: "admin123",
    userId: "u-admin-01",
  },
  {
    username: "liga.cesar",
    password: "liga123",
    userId: "u-liga-01",
  },
  {
    username: "club.israel",
    password: "club123",
    userId: "u-club-01",
  },
];

export const authenticate = (
  username: string,
  password: string
): User | null => {
  const match = authUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (!match) return null;
  return users.find((u) => u.id === match.userId) ?? null;
};
