import connection from "../dbStrategy/postgres.js";

export async function receiveStats(req, res) {
  const token = res.locals;
  let soma = 0;

  const { rows: user } = await connection.query(
    `SELECT users.id, users.name  
    FROM users 
    JOIN sessions 
    ON users.id = sessions."userId" 
    WHERE token = $1`,
    [token]
  );

  const { rows: urls } = await connection.query(
    `SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount"
    FROM urls
    JOIN sessions
    ON urls."userId" = sessions."userId"
    WHERE token = $1`,
    [token]
  );

  for (let i = 0; i < urls.length; i++) {
    soma = urls[i].visitCount + soma;
  }

  res.status(200).send({
    id: user[0].id,
    name: user[0].name,
    visitCount: soma,
    shortenedUrls: urls,
  });
}
