import express from "express";
import managerRouter  from "./routes/managerroutes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export const JWTSECRET = process.env.JWT_SECRET || "fallback_secret";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/manager', managerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
