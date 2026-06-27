import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotLoggedRedirect = () => {
  const [seconds, setSeconds] = useState(3);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          // navigate("/login");
          setRedirect(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (redirect) {
      setRedirect(false);
      navigate("/login");
    }
  }, [redirect]);

  return (
    <div className="min-h-[100vh] w-full h-full flex items-start justify-center pt-[20%]">
      <h2 className="text-center lg:text-4xl md:text-2xl text-lg font-extrabold tracking-wider">
        {`Usted no ha iniciado sesión, será redirigido en: ${seconds}`}
      </h2>
    </div>
  );
};
