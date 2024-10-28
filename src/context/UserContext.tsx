'use client'
// import { Role } from "@prisma/client";
import React, { SetStateAction } from "react";

export interface UserData {
  id: number;
  username: string;
  // role: Role;
}

export const UserContext = React.createContext<UserData | null>(null);
