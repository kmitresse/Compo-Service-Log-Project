import { NextFunction, Request, Response } from "express";
import { Log } from "../entity/Log";
import { TypeOrmDataSource } from "../TypeOrmDataSource";

export default async function logger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.info(`[${req.method}] ${req.url}`);

  if (req.path === "/randomize") {
    // Put the log into the database
    const log: Log = new Log(
      req.url,
      req.method as any,
      JSON.stringify(req.body)
    );
    await TypeOrmDataSource.manager.save(log);
  }

  next();
}
