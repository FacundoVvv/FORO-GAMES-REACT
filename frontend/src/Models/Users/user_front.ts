interface UserFromDB {
    username: string;
    email: string;
    token: string;
    isEmailVerified: boolean;
    roles: string[];
    [key: string]: any; 
}
export interface UserFront {
    username: string;
    email: string;
    token: string;
    isEmailVerified: boolean;
    roles: string[];
}
export const user_front = (userFromDB: UserFromDB): UserFront => ({
    username: userFromDB.username,
    email: userFromDB.email,
    token: userFromDB.token,
    isEmailVerified: userFromDB.isEmailVerified,
    roles: userFromDB.roles,
});