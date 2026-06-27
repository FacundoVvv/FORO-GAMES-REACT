import { createContext, useRef, useState, useEffect, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContextType } from "@Types/Forum/Sockets";
import { useAuth } from "./Auth_context";

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth(); 
  const socket = useRef<Socket | null>(null);
  const [isSocketReady, setIsSocketReady] = useState<boolean>(false);

  useEffect(() => {
    if (user.isLogged) {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }

      socket.current = io(import.meta.env.VITE_BACKEND_URL, { withCredentials: true });

      socket.current.on("connect", () => setIsSocketReady(true));
      socket.current.on("disconnect", () => setIsSocketReady(false));
      socket.current.on("connect_error", () => setIsSocketReady(false));
    } else {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
        setIsSocketReady(false);
      }
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
        setIsSocketReady(false);
      }
    };
  }, [user.isLogged]);

  return (
    <SocketContext.Provider value={{ socket, isSocketReady }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket debe usarse dentro de SocketProvider");
  return ctx;
};