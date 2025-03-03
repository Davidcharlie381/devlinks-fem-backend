import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { config } from "./config/env";

const PORT = config.PORT;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

export {io}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
