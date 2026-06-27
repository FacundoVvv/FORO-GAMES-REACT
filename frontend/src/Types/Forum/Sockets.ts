import { MutableRefObject } from "react";
import { Socket } from "socket.io-client";

export type SocketContextType = {
  socket: MutableRefObject<Socket | null>;
  isSocketReady: boolean;
};