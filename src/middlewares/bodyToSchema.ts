import { NextFunction, Request, Response } from "express";
import { Definitions } from "../services/dmn/interfaces";
import { DMN } from "../services/dmn/DMN";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.is("application/xml")) {
    const dmn: Definitions = await DMN.parse(req.body);
    req.body = DMN.getSchema(dmn);
    next();
  } else next();
}
