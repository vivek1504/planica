"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "User not logged in" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, __1.JWTSECRET);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid token" });
        return;
    }
}
