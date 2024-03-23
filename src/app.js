//Configuración de express
import express from 'express'
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js'
import contenidoRoutes from "./routes/contenido.routes.js"

const app = express()

//credentials - access to cokies
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api", contenidoRoutes);

export default app;