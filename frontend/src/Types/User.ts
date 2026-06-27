export type UserData = {
  _id: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  roles: Record<string, boolean>;
};

export type AuthUser = {
  isLogged: boolean;
  user: UserData | null;
};