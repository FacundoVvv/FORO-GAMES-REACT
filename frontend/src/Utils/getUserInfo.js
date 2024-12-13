const getUserInfo = async (username) => {
  const token = localStorage.getItem('token');
    try {
      const userObj = await fetch(`http://localhost:3000/users/${username}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
          }
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
export default getUserInfo;