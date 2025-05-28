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

    socket.on("newPost", ({ section, post }) => {
      // console.log("llegando a newpost con: ", post)
      if (section && post){
        console.log(`Nuevo post en seccion ${section}:`, post.title);
        io.to(section).emit('receive_post', post);
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
