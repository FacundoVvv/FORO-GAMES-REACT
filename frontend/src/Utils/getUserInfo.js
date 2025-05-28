export const getUserInfo = async (username) => {
    try {
      const userObj = await fetch(`http://localhost:3000/users/${username}`, {
          method: 'GET',
          credentials: "include"
    });
      
      if (!userObj.ok) {
        throw new Error('No se pudo obtener la información del usuario');
      }
      
      const userData = await userObj.json();
      return userData.user;

    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      return null;
    }
   }