import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const socket = useRef(null);
  const [isSocketReady, setIsSocketReady] = useState(false);

  const [user, setUser] = useState({
    isLogged: false,
    user: null,
  });

  useEffect(() => {
    if (user.isLogged) {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
  
      socket.current = io("http://localhost:3000", {
        withCredentials: true,
      });
  
      socket.current.on("connect", () => {
        setIsSocketReady(true);
        console.log("Socket conectado:", socket.current.id);
      });
  
      socket.current.on("disconnect", () => {
        setIsSocketReady(false);
        console.log("Socket desconectado");
      });
  
      socket.current.on("connect_error", (err) => {
        setIsSocketReady(false);
        console.error("Error conexión socket:", err.message);
      });
    } else {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
        setIsSocketReady(false);
      }
    }
  
    // clean and reset - unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
        setIsSocketReady(false);
      }
    };
  }, [user.isLogged]);

  return (
    <MyContext.Provider value={{ user, setUser, socket, isSocketReady }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
