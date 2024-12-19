import { NextFunction, Request, Response } from "express";

export default function (req: Request, _: Response, next: NextFunction) {
  if (req.is("application/xml")) {
    let data = "";
    req.setEncoding("utf8");
    req.on("data", (chunk: any) => (data += chunk));
    req.on("end", () => {
      req.body = data;
      next();
    });
  } else next();
}
