import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import LandingMain from './Components/landingMain/LandingMain';
import { MyProvider } from './Contexts/Main_context';
import Footer from './Components/Footer/Footer';
import RegisterPage from './Components/Register/Register';
import LoginPage from './Components/Login/Login';
import ConfirmEmail from './Components/Register/ConfirmEmail/ConfirmEmail';
function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<LandingMain/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/Confirm-email' element={<ConfirmEmail/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </MyProvider>
  )
}

export default App;
