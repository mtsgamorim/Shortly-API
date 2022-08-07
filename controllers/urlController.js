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

export async function redirectUrl(req, res) {
  const url = res.locals;
  console.log(url);
  let cont = url.visitCount + 1;
  await connection.query(`UPDATE urls SET "visitCount"=$1 WHERE id = $2;`, [
    cont,
    url.id,
  ]);
  res.redirect(`${url.url}`);
}

export async function deleteUrl(req, res) {
  const id = req.params.id;
  await connection.query("DELETE FROM urls WHERE id = $1", [id]);
  res.status(204).send();
}
