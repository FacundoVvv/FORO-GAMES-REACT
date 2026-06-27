import { Dispatch, SetStateAction } from "react";
import { AuthUser } from "./User";

export type AuthContextType = {
  user: AuthUser;
  setUser: Dispatch<SetStateAction<AuthUser>>;
};