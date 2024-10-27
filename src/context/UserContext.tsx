import { Role } from "@prisma/client";
import { createContext } from "react";

interface UserData {
  id        :number
  username  :string
  role      :Role
}

const UserContext = createContext<UserData | null>(null);
