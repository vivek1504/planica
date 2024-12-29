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
const vendorRouter = (0, express_1.Router)();
vendorRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const isValidVendor = yield prisma_1.default.vendor.findFirst({
            where: { email }
        });
        if (!isValidVendor) {
            res.json({ msg: "user does not exists" });
            return;
        }
        if (isValidVendor.password != password) {
            res.json({ msg: "invalid password" });
            return;
        }
        const token = (0, jsonwebtoken_1.sign)({ id: isValidVendor === null || isValidVendor === void 0 ? void 0 : isValidVendor.id, email: isValidVendor === null || isValidVendor === void 0 ? void 0 : isValidVendor.email }, __1.JWTSECRET);
        res.json({ token, msg: "login successfull" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
vendorRouter.put("/submitSubTaskForCompletion", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.user;
    const { subTaskId } = req.body;
    try {
        const isvalidsubTask = yield prisma_1.default.subTask.update({
            where: { id: subTaskId },
            data: { status: "FINISHEDBYVENDOR" }
        });
        res.json({ msg: "task submitted for approval" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal server error" });
    }
}));
vendorRouter.put("/NewTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.user;
    const { taskId, Response } = req.body;
    try {
        const isValidtask = yield prisma_1.default.task.findFirst({
            where: { id: taskId }
        });
        if (!isValidtask) {
            res.json({ msg: "invalid task id" });
        }
        const accept = yield prisma_1.default.task.update({
            where: { id: taskId },
            data: { approvedByVendor: Response }
        });
        res.json({ msg: "task accepted successfully" });
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "internal sever error" });
    }
}));
exports.default = vendorRouter;
