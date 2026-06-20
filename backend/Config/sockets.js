import { Server } from "socket.io";
import { socketAuthMiddleware } from "./socketsMiddleware.js";

export const socketsConfig = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", //producc link
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  //middleware - verify token
  io.use(socketAuthMiddleware);
  
  io.on("connection", (socket) => {
    console.log("Cliente conectado." + socket.id);

    // eventssss
    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
      console.log(`Nueva conexion en ${roomName}`);
    });

    socket.on("newReaction", ({ section, post_id, reaction }) => {
      console.log("new_reaction:");
      
      if (section && post_id && reaction){
        io.to(section).emit("receive_reaction", { post_id, reaction });
      }
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
  
  io.on("error", (error) => {
    console.error("Socket.IO error:", error);
  });
};
