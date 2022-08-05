import connection from "../dbStrategy/postgres.js";
import { nanoid } from "nanoid";

export async function createShortUrl(req, res) {
  const token = res.locals;
  const { url } = req.body;
  console.log(token);
  const shortUrl = nanoid();

  const { rows: session } = await connection.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );
  await connection.query(
    `INSERT INTO urls (url,"shortUrl","userId") VALUES ($1, $2, $3)`,
    [url, shortUrl, session[0].userId]
  );
  res.status(201).send({ shortUrl });
}

export async function getUrl(req, res) {
  const url = res.locals;
  res.status(200).send({
    id: url.id,
    shortUrl: url.shortUrl,
    url: url.url,
  });
}
