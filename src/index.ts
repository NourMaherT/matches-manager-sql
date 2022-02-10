import "reflect-metadata";
import {createConnection} from "typeorm";
import * as logger from 'morgan';
import * as express from 'express';
import 'express-async-errors';

import {userRouter} from './routers/users'
import {positionRouter} from './routers/positions'
// import {error} from './middleware/error'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))

app.use('/api/users', userRouter)
app.use('/api/positions', positionRouter)
// app.use(error)

createConnection().then(async connection => {
    console.log("Connected to the database...");
}).catch(error => console.log(error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
