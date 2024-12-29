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
const managerRouter = (0, express_1.Router)();
managerRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, number, password } = req.body;
    try {
        const existingUser = yield prisma_1.default.eventManager.findFirst({
            where: {
                OR: [
                    { email },
                    { number }
                ]
            }
        });
        if (existingUser) {
            res.status(400).json({ msg: "User already exists" });
            return;
        }
        const user = yield prisma_1.default.eventManager.create({
            data: {
                name,
                email,
                number,
                password,
            },
        });
        const token = (0, jsonwebtoken_1.sign)({ id: user.id, email }, __1.JWTSECRET);
        res.status(201).json({ msg: "User created successfully", token });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
managerRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const isExistingUser = yield prisma_1.default.eventManager.findUnique({
            where: {
                email
            }
        });
        if (!isExistingUser) {
            res.json({ msg: "user does not exist. try signing first" });
        }
        const token = (0, jsonwebtoken_1.sign)({ id: isExistingUser === null || isExistingUser === void 0 ? void 0 : isExistingUser.id, email: isExistingUser === null || isExistingUser === void 0 ? void 0 : isExistingUser.email }, __1.JWTSECRET);
        res.json({ token, msg: "login successfull" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.post("/createVendor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, number } = req.body;
    try {
        const existingVendor = yield prisma_1.default.vendor.findFirst({
            where: {
                OR: [
                    { email },
                    { number }
                ]
            }
        });
        if (existingVendor) {
            res.json({ msg: "user already exits try loging in " });
            return;
        }
        const vendor = yield prisma_1.default.vendor.create({
            data: {
                email,
                number,
                password,
                name
            }
        });
        res.json({ msg: "Vendor created successfully", email: vendor.email, password: vendor.password });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.post("/createTeamMemeber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, number, password } = req.body;
    try {
        const isExistingTeamMember = yield prisma_1.default.teamMember.findFirst({
            where: {
                OR: [
                    { email },
                    { password }
                ]
            }
        });
        if (isExistingTeamMember) {
            res.json({ msg: "user already exists" });
            return;
        }
        const teamMember = yield prisma_1.default.teamMember.create({
            data: {
                email,
                name,
                number,
                password
            }
        });
        res.json({ msg: "vendor created successfully", email, password });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.post("/createClient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, number, password } = req.body;
    try {
        const isExistingVendor = yield prisma_1.default.client.findFirst({
            where: {
                OR: [
                    { email },
                    { password }
                ]
            }
        });
        if (isExistingVendor) {
            res.json({ msg: "user already exists" });
            return;
        }
        const vendor = yield prisma_1.default.client.create({
            data: {
                email,
                name,
                number,
                password
            }
        });
        res.json({ msg: "vendor created successfully", email, password });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.post("/createEvent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, clientId, managerId, deadLine } = req.body;
    try {
        const existing = yield prisma_1.default.event.findFirst({
            where: {
                name
            }
        });
        if (existing) {
            res.json({ msg: "an event with the same name already exits" });
            return;
        }
        const event = yield prisma_1.default.event.create({
            data: {
                name,
                deadLine: new Date(deadLine),
                Client: { connect: { id: clientId } },
                manager: { connect: { id: managerId } },
                teamMembers: { create: [] },
                tasks: { create: [] },
            }
        });
        res.json({ msg: "event created successfully", event });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.post("/addTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, eventId, vendorId, teamMemberId, deadLine } = req.body;
    try {
        const existingTask = yield prisma_1.default.task.findFirst({
            where: {
                name
            }
        });
        if (existingTask) {
            res.json({ msg: "Task with this name exists" });
            return;
        }
        const newTask = yield prisma_1.default.task.create({
            data: {
                name,
                deadLine: new Date(deadLine),
                vendor: { connect: { id: vendorId } },
                teamMember: { connect: { id: teamMemberId } },
                event: { connect: { id: eventId } },
                subTaskRequest: { create: [] },
                subtasks: { create: [] },
                status: "CREATED"
            }
        });
        res.json({ msg: "task created successfully" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.post("/addSubTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, taskId, createdById, deadLine } = req.body;
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
                createdById,
                createdByRole: "MANAGER",
                deadLine: new Date(deadLine),
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
// managerRouter.post("/addTeamMemberToTask", async (req ,res) =>{
//   const {teamMemberId, taskId} = req.body;
//   try {
//     const isTeamMemberId = await prisma.teamMember.findFirst({
//       where : {id : teamMemberId}
//     })
//     const isTaskId = await prisma.task.findFirst({
//       where : {id : taskId}
//     })
//     if(!isTaskId && !isTeamMemberId){
//       res.json({msg : "invailid taskId or TeamMemberId"})
//       return
//     }
//     const addTeamMemberToTask = await prisma.task.update({
//       where : {
//         id : taskId
//       },
//       data : {
//       }
//     })
//   }
// })
managerRouter.post("/approveNewSubTask", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subTaskRequestId } = req.body;
    const { id } = req.body.user;
    try {
        const isValidRequsestId = yield prisma_1.default.subTaskRequest.findFirst({
            where: {
                id: subTaskRequestId
            }
        });
        if (!isValidRequsestId) {
            res.json({ msg: "invalid sub task request" });
            return;
        }
        const newSubTask = yield prisma_1.default.subTask.create({
            data: {
                name: isValidRequsestId.name,
                status: "CREATED",
                task: { connect: { id: isValidRequsestId.taskId } },
                createdById: id,
                createdByRole: "MANAGER",
                deadLine: isValidRequsestId.deadline
            }
        });
        const updateSubTaskRequest = yield prisma_1.default.subTaskRequest.update({
            where: { id: subTaskRequestId },
            data: { status: "APPROVED" }
        });
        res.json({ msg: "subTaskRequest accepted" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.post("/rejectNewSubTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subTaskRequestId } = req.body;
    try {
        const isValidRequsestId = yield prisma_1.default.subTaskRequest.findFirst({
            where: {
                id: subTaskRequestId
            }
        });
        if (!isValidRequsestId) {
            res.json({ msg: "invalid sub task request" });
            return;
        }
        const rejectSubTaskRequest = yield prisma_1.default.subTaskRequest.update({
            where: { id: subTaskRequestId },
            data: { status: "REJECTED" }
        });
        res.json({ msg: "subTaskRequest rejected" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.put("/completeEvent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.body;
    try {
        const isValidEvent = yield prisma_1.default.event.findFirst({
            where: {
                id: eventId
            }
        });
        if (!isValidEvent) {
            res.json({ msg: "event does not exist" });
            return;
        }
        const completedEvent = yield prisma_1.default.event.update({
            where: {
                id: eventId
            },
            data: {
                status: "COMPLETED"
            }
        });
        res.json({ msg: "event completed successfully" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.get("/listEvents", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield prisma_1.default.event.findMany({});
        res.json({ events });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.get("/listClients", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield prisma_1.default.client.findMany({});
        res.json({ clients });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.get("/listTeamMembers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamMembers = yield prisma_1.default.teamMember.findMany({});
        res.json({ teamMembers });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
managerRouter.get("/listVendor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield prisma_1.default.vendor.findMany({});
        res.json({ vendors });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
exports.default = managerRouter;
