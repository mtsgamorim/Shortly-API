import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;
dotenv.config();

const databaseConfig = {
  host: "localhost",
  database: "shortly",
  user: "postgres",
  password: "amorim040698",
  port: 5432,
};

const connection = new Pool(databaseConfig);

export default connection;
