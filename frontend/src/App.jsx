  import './App.css';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import Header from './Components/Header/Header';
  import LandingMain from './Components/landingMain/LandingMain';
  import Footer from './Components/Footer/Footer';
  import RegisterPage from './Components/Register/Register';
  import LoginPage from './Components/Login/Login';
  import ConfirmEmail from './Components/Register/ConfirmEmail/ConfirmEmail';
  import { useEffect, useContext } from 'react';
  import { MyContext } from './Contexts/Main_context'; 
  import getUserInfo from './Utils/getUserInfo';

  function App() {
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
            setUser(userObj);

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
          <Route path="/Confirm-email" element={<ConfirmEmail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }

  export default App;
