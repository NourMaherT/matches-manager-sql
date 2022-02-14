import "reflect-metadata";
import helmet from 'helmet';
import * as compression from 'compression';
import {createConnection} from "typeorm";
import * as config from 'config';
import * as logger from 'morgan';
import * as express from 'express';
import * as winston from 'winston';
import { createLogger, transports } from 'winston';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

import {userRouter} from './routers/users';
import {positionRouter} from './routers/positions';
import {playerRouter} from './routers/players';
import {matchRouter} from './routers/matches';
import {matchDetailRouter} from './routers/matchesDetailes';
import {error} from './middleware/error';

if(!config.get('jwt')) {
    console.error('FATAL ERROR: set a value to jwt variable.');
    process.exit(1);
}


/**
 * Logger setup
 */
const fileLogger = createLogger({
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({
        filename: 'logs/combined.log',
        level: 'info'
      }),
      new transports.File({
        filename: 'logs/errors.log',
        level: 'error'
      })
    ],
    exceptionHandlers: [
      new transports.File({ filename: 'logs/exceptions.log' })
    ],
    rejectionHandlers: [
      new transports.File({ filename: 'logs/rejections.log' })
    ]
  });
winston.add(fileLogger);

/**
 * Express Pipelines
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(logger('dev'));

app.use('/api/users', userRouter);
app.use('/api/positions', positionRouter);
app.use('/api/players', playerRouter);
app.use('/api/matches', matchRouter);
app.use('/api/matchDetailes', matchDetailRouter);
app.use(error);

/**
 * DB setup
 */
createConnection().then(() => {
    winston.info("Connected to the database...");
}).catch(error => console.log(error));

/**
 * Http and Https setup
 */
 const privateKey  = fs.readFileSync('sslcert/selfsigned.key', 'utf8');
 const certificate = fs.readFileSync('sslcert/selfsigned.crt', 'utf8');
 const credentials = {key: privateKey, cert: certificate};
 
 const port = process.env.PORT || 3000;
 const secPort = process.env.PORT || 3443;
 
 const httpServer = http.createServer(app);
 const httpsServer = https.createServer(credentials, app);
 
 httpServer.listen(port, () => {
   winston.info(`Listening on port ${port}...`);
 });
 httpsServer.listen(secPort, () => {
   winston.info(`Listening on port ${secPort}...`);
 });
