import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user_routes.js";
import companyRoute from "./routes/company_route.js";
import jobRoute from "./routes/job_route.js"
import applicationRoute from "./routes/application_route.js"


import dotenv from "dotenv";
dotenv.config({});
const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));


// api's
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)


app.get("/", (req, res) => {
  res.send("CSP applied successfully!");
});


app.listen(PORT, () => {
  connectDB();
  console.log(`server running at ${PORT} port`);
});
