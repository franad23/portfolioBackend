import express from "express";
import cors from "cors";
import morgan from "morgan";

//Routes
import homeMessageRoutes from "./routes/homeMessages.routes";
import helpersRoutes from "./helpers/pexelsaapi";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(morgan("dev"));

app.use("/api", homeMessageRoutes);
app.use("/api", helpersRoutes);

export default app;
