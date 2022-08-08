import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import authUrl from "./routes/urlRouter.js";
import userUrl from "./routes/userRouter.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(json());

app.use(authRouter);
app.use(authUrl);
app.use(userUrl);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta ${PORT}`);
});
