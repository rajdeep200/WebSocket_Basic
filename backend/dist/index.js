"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server: httpServer });
let userCount = 0;
wss.on("connection", function connection(socket) {
    socket.on("error", console.error);
    socket.on("message", function message(data, isBinary) {
        console.log("message: ", data);
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    console.log(`${++userCount} clients connected`);
    socket.send("Hello from WebSocket");
});
const PORT = 8080;
httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
