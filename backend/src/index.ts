import express from "express";
import managerRouter  from "./routes/managerroutes";
import cors from "cors";
import dotenv from "dotenv";
import teamMemberRouter from "./routes/teamMemberRoutes";

dotenv.config();

export const JWTSECRET = process.env.JWT_SECRET || "fallback_secret";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/manager', managerRouter);
app.use('/teamMember', teamMemberRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
