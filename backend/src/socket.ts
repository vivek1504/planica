import http from "http";
import { Server } from "socket.io";
import { app } from "./index";

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

export { server, io };
