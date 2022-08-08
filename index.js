import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import urlRouter from "./routes/urlRouter.js";
import userRouter from "./routes/userRouter.js";
import rankingRouter from "./routes/rankingRouter.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(json());

app.use(authRouter);
app.use(urlRouter);
app.use(userRouter);
app.use(rankingRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta ${PORT}`);
});
