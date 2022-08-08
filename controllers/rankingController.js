import connection from "../dbStrategy/postgres.js";

export async function receiveRanking(req, res) {
  const { rows: ranking } = await connection.query(`
    SELECT users.id, users.name, COUNT(urls.id) AS "linksCount",
    COALESCE (SUM(urls."visitCount"),0) AS "visitCount"
    FROM users
    LEFT JOIN urls
    ON urls."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10`);

  res.status(200).send(ranking);
}
