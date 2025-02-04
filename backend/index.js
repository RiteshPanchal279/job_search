import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user_routes.js";
import companyRoute from "./routes/company_route.js";
import jobRoute from "./routes/job_route.js"
import applicationRoute from "./routes/application_route.js"
import path from "path";
import helmet from "helmet"

import dotenv from "dotenv";
dotenv.config({});
const app = express();

const PORT = process.env.PORT || 3000;
const _dirname=path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"], // Blocks everything by default
        scriptSrc: ["'self'"],  // Allows scripts from the same domain
        styleSrc: ["'self'"],   // Allows styles from the same domain
        imgSrc: ["'self'"],     // Allows images from the same domain
        connectSrc: ["'self'"], // Allows XHR/WebSocket connections from the same domain
      },
    },
  })
);

// api's
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
});

app.get("/", (req, res) => {
  res.send("CSP applied successfully!");
});


app.listen(PORT, () => {
  connectDB();
  console.log(`server running at ${PORT} port`);
});
