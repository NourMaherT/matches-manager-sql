import "reflect-metadata";
import {createConnection} from "typeorm";
import * as config from 'config';
import * as logger from 'morgan';
import * as express from 'express';
import * as winston from 'winston';
import { createLogger, transports } from 'winston';
// import 'express-async-errors';

import {userRouter} from './routers/users';
import {positionRouter} from './routers/positions';
import {playerRouter} from './routers/players';
import {matchRouter} from './routers/matches';
import {mdRouter} from './routers/matchesDetailes';
import {error} from './middleware/error';

if(!config.get('jwt')) {
    console.error('FATAL ERROR: set a value to jwt variable.');
    process.exit(1);
}

const fileLogger = createLogger({
    transports: [
      new transports.File({
        filename: 'combined.log',
        level: 'info'
      }),
      new transports.File({
        filename: 'errors.log',
        level: 'error'
      })
    ],
    exceptionHandlers: [
      new transports.File({ filename: 'exceptions.log' })
    ],
    rejectionHandlers: [
      new transports.File({ filename: 'rejections.log' })
    ]
  });
winston.add(fileLogger);


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/api/users', userRouter);
app.use('/api/positions', positionRouter);
app.use('/api/players', playerRouter);
app.use('/api/matches', matchRouter);
app.use('/api/matchDetailes', mdRouter);
app.use(error);

createConnection().then(() => {
    console.log("Connected to the database...");
}).catch(error => console.log(error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
