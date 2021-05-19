// import mysql from "mysql2/promise";
import mysql , { Connection } from "mysql2/promise";

const env = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`invalid key`);
  return value;
};
let connection: Connection;
let getConnection = () => {
 console.log("here");
  if(connection){
    return connection;
  }
  (async ()  => {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: 3307,
      database: process.env.DB_NAME,
      user: process.env.DB_USER_NAME,
      password: process.env.DB_USER_PASSWORD,
  });
  
  await connection.connect();
  
})();
return connection
}

export default getConnection();