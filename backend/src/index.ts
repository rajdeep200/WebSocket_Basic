import express from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const httpServer = http.createServer(app);

const wss = new WebSocketServer({ server: httpServer });

let userCount = 0;
wss.on("connection", function connection(socket) {
  socket.on("error", console.error);

  socket.on("message", function message(data, isBinary) {
    console.log("message: ", data);
    
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  console.log(`${++userCount} clients connected`)
  socket.send("Hello from WebSocket");
});

const PORT = 8080;

httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
