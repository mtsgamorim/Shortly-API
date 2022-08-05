import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import connection from "../dbStrategy/postgres.js";

export async function createUser(req, res) {
  const user = req.body;
  const passwordHash = bcrypt.hashSync(user.password, 10);

  try {
    await connection.query(
      `INSERT INTO users (name,email,password) VALUES ($1, $2, $3)`,
      [user.name, user.email, passwordHash]
    );
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(409);
  }
}

export async function loginUser(req, res) {
  const user = req.body;

  const { rows: inPostgres } = await connection.query(
    `SELECT * FROM users WHERE email = $1`,
    [user.email]
  );
  console.log(inPostgres);

  if (
    inPostgres.length > 0 &&
    bcrypt.compareSync(user.password, inPostgres[0].password)
  ) {
    const token = uuid();
    await connection.query(`DELETE FROM sessions WHERE "userId" = $1`, [
      inPostgres[0].id,
    ]);
    await connection.query(
      `INSERT INTO sessions (token,"userId") VALUES ($1, $2)`,
      [token, inPostgres[0].id]
    );
    res.status(200).send(token);
  } else {
    res.status(401).send();
  }
}
