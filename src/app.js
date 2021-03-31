import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'fastest-validator';
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors-lite';
import { getLogger } from '#commons/logger';
import envConfig from "./config";

const logger = getLogger("app.js");

export const getAnApp = () => {
  const app = express();
  app.use(
    cors({
      origin: new RegExp(envConfig.CORS_REGEX),
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(cookieParser());

  if (process.env.NODE_ENV !== 'test')
    app.use(
      expressPinoLogger({
        logger,
        serializers: {
          req: (req) => ({
            method: req.method,
            url: req.url,
            body: req.raw.body,
          }),
          res: (res) => ({
            statusCode: res.statusCode,
            body: res.raw.body,
          }),
        },
      })
    );

  app.use(express.json());
  return app;
};

const notFoundHandler = (req, res, next) => {
  next(createError(StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));
};

const isGoodError = (error) => error.statusCode <= 404;

const errorHandler = (error, req, res, _next) => {
  if (process.env.NODE_ENV !== 'test') {
    logger.error(`${error.statusCode} 💥 ${error.message}`);
    logger.error(error.stack);
  }
  if (['development', 'test'].some((x) => x === process.env.NODE_ENV)) {
    res.status(error.statusCode || 500);
    res.send({ error: error.message });
  } else {
    res.status(isGoodError(error) ? error.statusCode : 500);
    res.send({
      error: isGoodError(error) ? error.message : 'SOMETHING WENT WRONG',
    });
  }
};

export const finishApp = (expressApp) => {
  expressApp.use(notFoundHandler);
  expressApp.use(errorHandler);
};
