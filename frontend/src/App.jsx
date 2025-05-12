  import './App.css';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import { Header } from './Components/Header/Header';
  import { LandingMain } from './Components/landingMain/LandingMain';
  import { Footer } from './Components/Footer/Footer';
  import { RegisterPage } from './Components/Register/Register';
  import { LoginPage } from './Components/Login/Login';
  import { ConfirmEmail } from './Components/Register/ConfirmEmail/ConfirmEmail';
  import { MyAccount } from './Components/User/MyAccount/MyAccount';
  import { useEffect, useContext } from 'react';
  import { MyContext } from './Contexts/Main_context'; 
  import { getUserInfo } from './Utils/getUserInfo';

export const App = () => {
    const { setUser } = useContext(MyContext); 

    useEffect(() => {
      const tokenLS = localStorage.getItem('token');
      if (tokenLS) {
        const verifyToken = async () => {
          try {
            const validateToken = await fetch('http://localhost:3000/auth/verifyToken', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: tokenLS }),
            });

            if (!validateToken.ok) {
              console.error('Token inválido');
              return;
            }

            const data = await validateToken.json();

            const username = data.user.trim();
            
            //logica de traer toda la info del user y guardarla en el estado.
            const userObj = await getUserInfo(username);
            setUser(prev => ({
              ...prev,
              ...userObj,
              isLogged: true
            }));

          } catch (error) {
            console.error('Error al verificar el token:', error);
          }
        };

        verifyToken();
      }
    }, []);

    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingMain />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/my-account" element={<MyAccount />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }

