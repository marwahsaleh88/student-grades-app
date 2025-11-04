import express, { Express } from "express";
import cors from "cors";
import connectDB from "./config/db";
import studentRoutes from "./routes/studentsRouter";

// ✅ TypeScript Konzept: Explizite Typisierung
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000");

// ✅ CORS-Konfiguration
const allowedOrigins = [
  "http://localhost:5173", // lokal für Entwicklung
  "https://student-grades-frontend.onrender.com", // dein Frontend auf Render
  "https://student-grades-frontend-0fvx.onrender.com" // ggf. alternative URL
];

const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

// ✅ Middleware
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Routes
app.use("/api/students", studentRoutes);

// ✅ Root route (zum Testen)
app.get("/", (req, res) => {
  res.send("Backend läuft! 🚀");
});

// ✅ Konzept: Funktions-Typisierung mit async
async function startServer(): Promise<void> {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
  });
}

startServer();
