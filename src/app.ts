import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoutes from "./routes/userRoutes";
import journalEntryRoutes from "./routes/journalEntryRoutes";
import summaryRoutes from "./routes/summaryRoutes"


const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/journal", journalEntryRoutes);
app.use("/api", summaryRoutes);

export default app;
