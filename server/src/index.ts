import express from "express";
import cors from "cors";
import "./db/database";
import userRoutes from "./routes/userRoutes";
import activityFactorRoutes from "./routes/activityFactorRoutes";
import profileRoutes from "./routes/profileRoutes"; 
import calculationRoutes from "./routes/calculationRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import chatRoutes from "./routes/chatRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/activity-factors", activityFactorRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/calculation", calculationRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/chat", chatRoutes);
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
}); 