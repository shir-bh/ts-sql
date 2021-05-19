
import express, { Application } from 'express'
import morgan from 'morgan'
import user_router from "./user/user.router";
import {getEnv} from "./helper/help";
// import log from '@ajar/marker'
import cors from 'cors'

// const PORT=parseInt(getEnv("PORT"));
const PORT=3030;
const app = express();

// middleware
app.use(cors());
app.use(morgan('dev'))

// routing
// app.use('/api/stories', story_router);
app.use('/api/users', user_router);

(async () => {
    //connect to mongo db
    // await connect_db(DB_URI);
    // const Host :string = getEnv("HOST");
    await app.listen(PORT);
    console.log(`api is live on`, `http://locallhost:${PORT}`);

  })().catch(console.log);

