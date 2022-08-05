import joi from "joi";
import connection from "../dbStrategy/postgres.js";

export function validateUrl(req, res, next) {
  const url = req.body;

  const urlSchema = joi.object({
    url: joi.string().uri().required(),
  });

  const validation = urlSchema.validate(url);
  if (validation.error) {
    res.status(422).send(
      validation.error.details.map((detail) => {
        return detail.message;
      })
    );
    return;
  }

  next();
}

export async function validateParam(req, res, next) {
  const param = req.params.id;
  const id = Number(param);
  if (isNaN(id)) {
    res.sendStatus(404);
    return;
  }

  const { rows: url } = await connection.query(
    `SELECT * FROM urls WHERE id = $1`,
    [id]
  );
  if (url.length === 0) {
    res.sendStatus(404);
    return;
  }
  res.locals = url[0];

  next();
}
