export const user_front = ( userFromDB ) => ({
    
        username: userFromDB.username,
        email: userFromDB.email,
        token: userFromDB.token,
        isEmailVerified: userFromDB.isEmailVerified,
        roles: userFromDB.roles,
});

