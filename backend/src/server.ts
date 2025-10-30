import express, { Express } from "express"; 
import cors from "cors"; 
import connectDB from "./config/db"; 
import studentRoutes from "./routes/studentsRouter"; 
 
// ✅ TypeScript Konzept: Explizite Typisierung
const app: Express = express(); 
const PORT: number = parseInt(process.env.PORT || "5000"); 
 
// Middleware 

const allowedOrigins = [
  "http://localhost:5173",
  "https://student-grades-frontend.onrender.com"
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

app.use(cors(corsOptions));
app.use(express.json()); 
 
// Routen 
app.use("/api/students", studentRoutes); 
 
// ✅ Konzept: Funktions-Typisierung mit async
async function startServer(): Promise<void> { 
  await connectDB(); 
   
  app.listen(PORT, () => { 
    console.log(`Server läuft auf Port ${PORT}`); 
  }); 
}; 
 
startServer();
