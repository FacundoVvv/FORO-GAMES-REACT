import React, { useContext, useState, useRef, useEffect } from 'react';
import { MyContext } from '@Contexts/Main_context';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { user } = useContext(MyContext);
  const dropdownRef = useRef(null);
  const accountLinkRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        accountLinkRef.current &&
        !accountLinkRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setAccountDropdownOpen(false);
      }
      if (isMobileMenuOpen &&
        !event.target.closest('[data-mobile-menu]') &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Ayuda', path: '/forum/help' },
    { label: 'Reportes', path: '/forum/reports' },
    { label: 'Foro', path: '/forum' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex-shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <h1 className="text-2xl font-bold text-white tracking-tight">
              <span className="text-slate-900">SF</span>-RP
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 flex-grow ml-16">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 text-white font-medium text-sm hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user.isLogged ? (
              <div className="hidden md:block relative">
                <Link
                  to="/my-account"
                  ref={accountLinkRef}
                  onMouseEnter={() => setAccountDropdownOpen(true)}
                  onMouseLeave={() => setAccountDropdownOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-white font-medium text-sm hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>Mi cuenta
                </Link>

                {isAccountDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    onMouseEnter={() => setAccountDropdownOpen(true)}
                    onMouseLeave={() => setAccountDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-purple-500/20"
                  >
                    <Link
                      to="/my-profile"
                      className="block w-full px-4 py-3 text-white font-medium text-sm hover:bg-purple-600/40 rounded-lg transition-colors duration-200"
                    >
                      Mi perfil
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white font-medium text-sm hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-purple-600 font-bold text-sm rounded-lg hover:bg-slate-100 transition-colors duration-200 shadow-md"
                >
                  Registrarme
                </Link>
              </div>
            )}

            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Abrir menú"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            data-mobile-menu
            className="md:hidden pb-4 border-t border-white/10"
          >
            <div className="space-y-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-white font-medium text-sm hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}

              {user.isLogged ? (
                <>
                  <Link
                    to="/my-account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-white font-medium text-sm hover:bg-white/10 rounded-lg transition-colors duration-200"
                  >
                    Mi cuenta
                  </Link>
                  <Link
                    to="/my-profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-white font-medium text-sm hover:bg-white/10 rounded-lg transition-colors duration-200"
                  >
                    Mi perfil
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-white font-medium text-sm hover:bg-white/10 rounded-lg transition-colors duration-200"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 bg-white text-purple-600 font-bold text-sm rounded-lg hover:bg-slate-100 transition-colors duration-200 mt-2"
                  >
                    Registrarme
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};