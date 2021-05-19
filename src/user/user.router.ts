/* 
  if there is an error thrown in the DB, asyncMiddleware
  will pass it to next() and express will handle the error */
// import connection from "../db/db.connection";
import get_connection from  "../db/db.connection";
import raw from "../middleware/route.async.wrapper";
import {Connection} from "mysql2/promise";
// import user_model from "./user.model.mjs";
import express from "express";
import { Request, Response } from 'express'
import { schema_insert, schema_update } from "./validate.model";

const connection  = get_connection;
const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

router.post(
  "/",
  raw(async (req:Request, res:Response) => {
    const { error  , value } = schema_insert.validate(req.body);
    if (error) {
      throw new Error(String(error));
    } else {
      console.log(req.body);
      const user = await connection.query(
        `INSERT INTO users (first_name, last_name, email) VALUES ("${req.body.first_name}", "${req.body.last_name}", "${req.body.email}");`
      );
      res.status(200).json(user);
    }
  })
);

router.get(
  "/",
  raw(async (req:Request, res:Response) => {
    const users = await connection.query("SELECT * FROM users;");
    res.status(200).json(users);
  })
);

router.get(
  "/paginate/:page?/:items?",
  raw(async (req:Request, res:Response) => {
    console.log(req.params, "get all users, req.params:");
    let { page = 0, items = 10 } = req.params;
    // const users = await connection.query(
    //   `SELECT * FROM users LIMIT ${page * items},${items}`
    // );
    const users = await connection.query(
      `SELECT * FROM users LIMIT ${items} OFFSET ${page};`
    );
    res.status(200).json(users);
  })
);

// GETS A SINGLE USER
router.get(
  "/:id",
  raw(async (req:Request, res:Response) => {
    const user :any = await connection.query(
      `SELECT * FROM users WHERE id = ${req.params.id};`
    );
    res.status(200).json(user[0][0]);
  })
);

// // UPDATES A SINGLE USER
router.put(
  "/:id",
  raw(async (req:Request, res:Response) => {
    const result = schema_update.validate(req.body);
    if (result.error == null) {
      let updateString = `UPDATE users SET `;
      let updateArr = [];
      for (const field in req.body) {
        updateArr.push(`${field}="${req.body[field]}"`);
      }
      updateString = updateString + updateArr.join(", ");
      updateString = updateString + ` WHERE id=${req.params.id} `;
      console.log(updateString);
      const user = await connection.query(updateString);
      res.status(200).json(user);
    } else {
      throw new Error(String(result.error));
    }
  })
);

// DELETES A USER
router.delete(
  "/:id",
  raw(async (req:Request, res:Response) => {
    const user = connection.query(
      `DELETE FROM users WHERE id=${req.params.id}`
    );
    res.status(200).json(user);
  })
);

export default router;
