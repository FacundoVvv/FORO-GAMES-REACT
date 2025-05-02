import React, { useContext, useState } from 'react';
import './header.css';
import { MyContext } from '@Contexts/Main_context';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isLogged, setIsLogged } = useContext(MyContext);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-8 h-[75px] flex items-center justify-between px-8 relative shadow-lg">
      <h1 className="text-2xl font-extrabold relative cool-title">
        <Link to='/'><span className='text-black'>SF</span>-RP</Link>
      </h1>
      <nav className="tracking-wide font-semibold hidden md:flex flex-grow justify-start space-x-8 ml-40 text-[14px]">
        <a href="#" className="hover:text-gray-300 transition duration-300 ease-in-out nav_links">Ayuda</a>
        <a href="#" className="hover:text-gray-300 transition duration-300 ease-in-out nav_links">Reportes</a>
      </nav>
      <div className="flex items-center space-x-4">
        {isLogged
          ? <a href="#" className="hidden md:block px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out shadow-md">Mi cuenta</a>
          : <ul className="hidden md:flex space-x-4">
            <li><Link to='/login' className="text-[14px] hover:text-gray-300 font-bold transition duration-300 ease-in-out nav_links">Iniciar sesión</Link></li>
            <li><Link to='/register' className="text-[14px] bg-white text-purple-500 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out shadow-md">Registrarme</Link></li>
          </ul>
        }
        <button className="md:hidden p-2 focus:outline-none" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 right-6 bg-purple-700 text-white w-40 rounded-lg shadow-lg md:hidden">
          <a href="#" className="block px-4 py-2 hover:bg-purple-600 transition duration-300 ease-in-out">Ayuda</a>
          <a href="#" className="block px-4 py-2 hover:bg-purple-600 transition duration-300 ease-in-out">Información</a>
          {isLogged
            ? <a href="#" className="block px-4 py-2 hover:bg-purple-600 transition duration-300 ease-in-out">Mi cuenta</a>
            : (
              <ul className="flex flex-col">
                <Link to='/login' className="block px-4 py-2 hover:bg-purple-600 transition duration-300 ease-in-out">Iniciar sesión</Link>
                <Link to='/register' className="block px-4 py-2 bg-white text-purple-500 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out shadow-md">Registrarme</Link>
              </ul>
            )
          }
        </div>
      )}
    </header>
  );
};


