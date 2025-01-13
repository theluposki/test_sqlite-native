import express from "express";
import cors from "cors";
import morgan from "morgan";
import { routes } from "./routes/index.js";
import config from "./config.js";
import { errorSync } from "./middlewares/errorSync.js";
import { errorHandlerJSON } from "./middlewares/errorHandlerJSON.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(config.cors));
app.use(cookieParser());
app.use(express.json());
app.use(errorSync);
app.use(errorHandlerJSON);
app.use(morgan('dev'));
routes(app);

app.use(express.json())




app.get("/", (req, res) => {
  res.status(200).json({ server: "OK" });
});

export default app;
