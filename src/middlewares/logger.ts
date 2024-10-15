import { NextFunction, Request, Response } from "express";
import { Log } from "../entity/Log";
import { AppDataSource } from "../AppDataSource";

export default async function logger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.info(`[${req.method}] ${req.url}`);
  // Put the log into the database
  const log: Log = new Log(
    req.url,
    req.method as any,
    JSON.stringify(req.body)
  );
  await AppDataSource.manager.save(log);

  next();
}
