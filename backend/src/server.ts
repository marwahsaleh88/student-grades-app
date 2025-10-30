import express, { Express } from "express";
import cors from "cors";
import connectDB from "./config/db";
import studentRoutes from "./routes/studentsRouter";
// ✅ TypeScript Konzept: Explizite Typisierung
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "5000");
// Middleware
// app.use(cors());
const corsOptions = {
 origin: process.env.FRONTEND_URL || "http://localhost:5173",
 credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
// Routen
app.use("/api/students", studentRoutes);
// ✅ Konzept: Funktions-Typisierung mit async
async function startServer(): Promise<void> {
await connectDB();
app.get("/", (req, res) => {
  res.send("Backend läuft! 🚀");
});


app.listen(PORT, () => {
console.log(`Server läuft auf Port ${PORT}`);
});
};
startServer();