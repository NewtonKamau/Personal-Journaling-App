import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoutes from "./routes/userRoutes";
import journalEntryRoutes from "./routes/journalEntryRoutes";


const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/journal", journalEntryRoutes);
export default app;
