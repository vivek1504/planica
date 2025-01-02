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
const teamMemberRouter = (0, express_1.Router)();
teamMemberRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const isValidTeamMember = yield prisma_1.default.teamMember.findFirst({
            where: { email }
        });
        if (!isValidTeamMember) {
            res.json({ msg: "user does not exists" });
            return;
        }
        if (isValidTeamMember.password != password) {
            res.json({ msg: "invalid password" });
            return;
        }
        const token = (0, jsonwebtoken_1.sign)({ id: isValidTeamMember === null || isValidTeamMember === void 0 ? void 0 : isValidTeamMember.id, email: isValidTeamMember === null || isValidTeamMember === void 0 ? void 0 : isValidTeamMember.email }, __1.JWTSECRET);
        res.json({ token, msg: "login successfull" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
teamMemberRouter.post("/addSubTask", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, taskId, deadLine } = req.body;
    const { id } = req.body.user;
    try {
        const existingsubTask = yield prisma_1.default.subTask.findFirst({
            where: {
                name
            }
        });
        if (existingsubTask) {
            res.json({ msg: "subTask with the same name exits" });
            return;
        }
        const subTask = yield prisma_1.default.subTask.create({
            data: {
                name,
                status: "CREATED",
                createdById: id,
                createdByRole: "TEAM_MEMBER",
                deadLine,
                task: { connect: { id: taskId } }
            }
        });
        res.json({ msg: "subTask added successfully" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
teamMemberRouter.post("/addSubTaskRequest", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, deadLine, taskId, requestedById } = req.body;
    try {
        const isvalidtask = yield prisma_1.default.task.findFirst({
            where: { id: taskId }
        });
        const existingsubTask = yield prisma_1.default.subTask.findFirst({
            where: { name }
        });
        const existingSubTaskRequest = yield prisma_1.default.subTaskRequest.findFirst({
            where: { name }
        });
        if (!isvalidtask) {
            res.json({ msg: "this task does not exist" });
            return;
        }
        if (existingSubTaskRequest && existingsubTask) {
            res.json({ msg: "sub task with same name already exists" });
            return;
        }
        const newSubTaskRequest = yield prisma_1.default.subTaskRequest.create({
            data: {
                name,
                taskId,
                requestedById,
                status: "PENDING",
                deadline: deadLine
            }
        });
        res.json({ msg: "sub task request sent successfully" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
teamMemberRouter.put("/subTaskCompletion", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subTaskId } = req.body;
    try {
        const isValidSubtask = yield prisma_1.default.subTask.findFirst({
            where: { id: subTaskId }
        });
        if (!isValidSubtask) {
            res.json({ msg: "Invalid sub task Id" });
            return;
        }
        const completionRequest = yield prisma_1.default.subTask.update({
            where: { id: subTaskId },
            data: { status: "UNDERREVIEWBYCLIENT" }
        });
        res.json({ msg: "sub task completed" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal sever error" });
    }
}));
teamMemberRouter.put("/rejectSubTaskCompletion", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subTaskId } = req.body;
    try {
        const isValidSubtask = yield prisma_1.default.subTask.findFirst({
            where: { id: subTaskId }
        });
        if (!isValidSubtask) {
            res.json({ msg: "Invalid sub task Id" });
            return;
        }
        const completionRequest = yield prisma_1.default.subTask.update({
            where: { id: subTaskId },
            data: { status: "REJECTEDBYTEAMMEMBER" }
        });
        res.json({ msg: "sub task completion request rejected" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal sever error" });
    }
}));
teamMemberRouter.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user;
    try {
        const tasks = yield prisma_1.default.task.findMany({
            where: { teamMemberId: id }
        });
        res.json({ tasks });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
teamMemberRouter.get("/subTasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user;
    try {
        const subTasks = yield prisma_1.default.subTask.findMany({
            where: { createdById: id, createdByRole: "MANAGER" }
        });
        res.json({ subTasks });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
teamMemberRouter.post("/messages", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                senderRole: "TEAM_MEMBER"
            }
        });
        res.json({ msg: "message sent successfully", newMessage });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal sever error" });
    }
}));
exports.default = teamMemberRouter;
