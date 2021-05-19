// // import mysql from "mysql2/promise";
// import mysql, { Connection } from "mysql2/promise";

const env = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`invalid key`);
  return value;
};
// let connection: Connection;
// let getConnection = () => {
//   if (connection) {
//     return connection;
//   }
//   (async () => {
//     connection = await mysql.createConnection({
//       // host: process.env.DB_HOST,
//       host: env("DB_HOST"),
//       port: Number(env("DB_PORT")),
//       database: env("DB_NAME"),
//       user: env("DB_USER_NAME"),
//       password: env("DB_USER_PASSWORD"),
//     });

//     await connection.connect();
//   })();
//   return connection;
// };

// export default getConnection;

import * as mysql from "mysql2/promise";
// import { env } from "../utils/types";
const PORT = parseInt(env("DB_PORT"));
const HOST = env("DB_HOST");
const USER = env("DB_USER_NAME");
const PASSWORD = env("DB_USER_PASSWORD");
const DB = env("DB_NAME");
export async function connect() {
  const conn = await mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB,
    port: PORT,
  });
  return conn;
}
