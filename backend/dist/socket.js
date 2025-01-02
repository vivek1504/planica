"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = void 0;
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const index_1 = require("./index");
const server = http_1.default.createServer(index_1.app);
exports.server = server;
const io = new socket_io_1.Server(server);
exports.io = io;
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
