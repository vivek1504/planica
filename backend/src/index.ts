import express from "express";
import managerRouter  from "./routes/managerroutes";
import cors from "cors";
import dotenv from "dotenv";
import teamMemberRouter from "./routes/teamMemberRoutes";
import clientRouter from "./routes/clientRoutes";
import vendorRouter from "./routes/vendorRoutes";

dotenv.config();

export const JWTSECRET = process.env.JWT_SECRET || "fallback_secret";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/manager', managerRouter);
app.use('/teamMember', teamMemberRouter);
app.use('/client', clientRouter)
app.use('/vendor', vendorRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
