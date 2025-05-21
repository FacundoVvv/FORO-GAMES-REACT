import React, { useContext, useState, useRef, useEffect } from 'react';
import './header.css';
import { MyContext } from '@Contexts/Main_context';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const { user, setUser } = useContext(MyContext);
  const dropdownRef = useRef(null);
  const accountLinkRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // handlers for desktop dropdown
  const handleMouseEnter = () => {
    setDesktopDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDesktopDropdownOpen(false);
  };

  // close dropdown when mouse is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) && 
        accountLinkRef.current && 
        !accountLinkRef.current.contains(event.target)
      ) {
        setDesktopDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-8 h-[75px] flex items-center justify-between px-8 relative shadow-lg">
      <h1 className="text-2xl font-extrabold relative cool-title">
        <Link to='/'><span className='text-black'>SF</span>-RP</Link>
      </h1>
      <nav className="tracking-wide font-semibold hidden md:flex flex-grow justify-start space-x-8 ml-40 text-[14px]">
        <Link to="/forum/help" className="hover:text-gray-300 transition duration-300 ease-in-out nav_links">Ayuda </Link>
        <Link to="/forum/reports" className="hover:text-gray-300 transition duration-300 ease-in-out nav_links">Reportes </Link>
        {user.isLogged && <Link to="/forum" className="hover:text-gray-300 transition duration-300 ease-in-out nav_links">Foro</Link>}
      </nav>
      <div className="flex items-center space-x-4">
        {user.isLogged ? (
          <ul className='hidden md:flex items-center justify-center'>
            <li className="relative">
              <Link 
                to="/my-account" 
                className="block px-4 py-2 hover:bg-purple-600 hover:rounded-lg transition duration-300 ease-in-out"
                onMouseEnter={handleMouseEnter}
                ref={accountLinkRef}
              >
                Mi cuenta
              </Link>
              
              {/* desktop dropdown menu */}
              {isDesktopDropdownOpen && (
                <div 
                  className="absolute top-10 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white w-40 rounded-lg shadow-lg hidden md:block"
                  ref={dropdownRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  
                  <Link 
                    to="/my-profile" 
                    className="block px-4 py-2 hover:bg-purple-500 transition duration-300 ease-in-out rounded-b-lg"
                  >
                    Mi perfil
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link to="/my-profile" className="block px-4 py-2 hover:bg-purple-600 hover:rounded-lg transition duration-300 ease-in-out md:hidden">
                Mi perfil
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="hidden md:flex space-x-4">
            <li>
              <Link to='/login' className="text-[14px] hover:text-gray-300 font-bold transition duration-300 ease-in-out nav_links">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to='/register' className="text-[14px] bg-white text-purple-500 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out shadow-md">
                Registrarme
              </Link>
            </li>
          </ul>
        )}
        <button className="md:hidden p-2 focus:outline-none" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      
      {/* mobile dropdown menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white w-40 rounded-lg shadow-lg md:hidden">
          <Link to="/forum/help" className="block px-4 py-2 hover:bg-purple-500 transition duration-300 ease-in-out rounded-t-lg border-b border-purple-400">
            Ayuda
          </Link>
          <Link to="/forum/reports" className="block px-4 py-2 hover:bg-purple-500 transition duration-300 ease-in-out border-b border-purple-400">
            Reportes
          </Link>
          {user.isLogged ? (
            <>
              {user.isLogged && (
                <Link to="/forum" className="block px-4 py-2 hover:bg-purple-500 transition duration-300 ease-in-out border-b border-purple-400">
                  Foro
                </Link>
              )}
              <Link to="/my-account" className="block px-4 py-2 hover:bg-purple-500 transition duration-300 ease-in-out border-b border-purple-400">
                Mi cuenta
              </Link>
              <Link to="/my-profile" className="block px-4 py-2 hover:bg-purple-500 transition duration-300 ease-in-out rounded-b-lg">
                Mi perfil
              </Link>
            </>
          ) : (
            <ul className="flex flex-col">
              <li>
                <Link to='/login' className="block px-4 py-2 hover:bg-purple-500 transition duration-300 ease-in-out border-b border-purple-400">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to='/register' className="block px-4 py-2 bg-white text-purple-500 rounded-b-lg font-medium hover:bg-gray-100 transition duration-300 ease-in-out">
                  Registrarme
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </header>
  );
};