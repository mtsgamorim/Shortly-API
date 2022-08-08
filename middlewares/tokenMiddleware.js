import connection from "../dbStrategy/postgres.js";
import joi from "joi";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    res.sendStatus(401);
    return;
  }

  const { rows: session } = await connection.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );

  if (session.length === 0) {
    res.sendStatus(401);
    return;
  }

  res.locals = token;
  next();
}
