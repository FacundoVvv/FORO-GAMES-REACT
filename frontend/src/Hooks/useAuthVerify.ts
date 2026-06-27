import { useEffect, useContext } from 'react';
import { useAuth } from '@Contexts/Auth_context';
import { getUserInfo } from '@Utils/api/Users';

export const useAuthVerify = () => {
  const { setUser } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const validateToken = await fetch(
          'http://localhost:3000/auth/verifyToken',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        if (!validateToken.ok) {
          console.error('Token inválido');
          return;
        }

        const data = await validateToken.json();
        const username = data?.user?.trim();

        if (!username) {
          console.error('No se recibió el usuario.');
          return;
        }

        const userObj = await getUserInfo(username);

        setUser((prev) => ({
          ...prev,
          user: userObj,
          isLogged: true,
        }));
      } catch (error) {
        console.error('Error al verificar el token:', error);
      }
    };

    verifyToken();
  }, [setUser]);
};