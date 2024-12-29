"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTSECRET = void 0;
const express_1 = __importDefault(require("express"));
const managerroutes_1 = __importDefault(require("./routes/managerroutes"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const teamMemberRoutes_1 = __importDefault(require("./routes/teamMemberRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const vendorRoutes_1 = __importDefault(require("./routes/vendorRoutes"));
dotenv_1.default.config();
exports.JWTSECRET = process.env.JWT_SECRET || "fallback_secret";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/manager', managerroutes_1.default);
app.use('/teamMember', teamMemberRoutes_1.default);
app.use('/client', clientRoutes_1.default);
app.use('/vendor', vendorRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
