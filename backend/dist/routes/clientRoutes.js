"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
const __1 = require("..");
const authMiddleware_1 = require("../authMiddleware/authMiddleware");
const clientRouter = (0, express_1.Router)();
clientRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const isValidClient = yield prisma_1.default.client.findFirst({
            where: { email }
        });
        if (!isValidClient) {
            res.json({ msg: "user does not exists" });
            return;
        }
        if (isValidClient.password != password) {
            res.json({ msg: "invalid password" });
            return;
        }
        const token = (0, jsonwebtoken_1.sign)({ id: isValidClient === null || isValidClient === void 0 ? void 0 : isValidClient.id, email: isValidClient === null || isValidClient === void 0 ? void 0 : isValidClient.email }, __1.JWTSECRET);
        res.json({ token, msg: "login successfull" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
clientRouter.post("/requestNewSubtask", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.user;
    const { name, taskId, deadLine } = req.body;
    try {
        const isvalidTask = yield prisma_1.default.task.findFirst({
            where: { id: taskId }
        });
        if (!isvalidTask) {
            res.json({ msg: "task with this id does not exists" });
            return;
        }
        const newSubTaskRequest = yield prisma_1.default.subTaskRequest.create({
            data: {
                name,
                taskId,
                requestedById: id,
                deadline: deadLine
            }
        });
        res.json({ msg: "new sub task request added successfully" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
clientRouter.put("/approveSubTaskCompletion", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subtaskId } = req.body;
    try {
        const isvalidSubtask = yield prisma_1.default.subTask.findFirst({
            where: { id: subtaskId }
        });
        if (!isvalidSubtask) {
            res.json({ msg: "invaild subtask id" });
        }
        const completedSubTask = yield prisma_1.default.subTask.update({
            where: { id: subtaskId },
            data: { status: "COMPLETED" }
        });
        res.json({ msg: "sub task completed" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
clientRouter.put("/rejectSubTaskCompletion", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subtaskId } = req.body;
    try {
        const isvalidSubtask = yield prisma_1.default.subTask.findFirst({
            where: { id: subtaskId }
        });
        if (!isvalidSubtask) {
            res.json({ msg: "invaild subtask id" });
        }
        const completedSubTask = yield prisma_1.default.subTask.update({
            where: { id: subtaskId },
            data: { status: "REJECTEDBYCLIENT" }
        });
        res.json({ msg: "sub task completion rejected" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
clientRouter.post("/messages", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId, text } = req.body;
    const { id } = req.body.user;
    try {
        const isValidTask = yield prisma_1.default.task.findFirst({
            where: { id: taskId }
        });
        if (!isValidTask) {
            res.json({ msg: "invalid taskId" });
            return;
        }
        const newMessage = yield prisma_1.default.comments.create({
            data: {
                text,
                taskId,
                senderId: id,
                senderRole: "CLIENT"
            }
        });
        res.json({ msg: "message sent successfully", newMessage });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal sever error" });
    }
}));
exports.default = clientRouter;
