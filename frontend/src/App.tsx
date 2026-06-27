import { FC } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@Components/Header/Header';
import { Footer } from '@Components/Footer/Footer';
import { publicRoutes, protectedRoutes } from '@Router/Routes';
import { ProtectedRoute } from '@Router/ProtectedRoute';
import { useAuthVerify } from '@Hooks/useAuthVerify';

export const App: FC = () => {
  useAuthVerify();

  return (
    <BrowserRouter>
    <Header />
    <main className="flex-1 w-full">
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route element={<ProtectedRoute />}>
          {protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
  );
};

export default App;