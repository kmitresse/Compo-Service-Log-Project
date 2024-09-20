import { Router, Request, Response } from "express";

const router = Router();

router.post("/randomize", (req: Request, res: Response) => {
  // TODO: Implement randomize route

  // TODO: Parse the DMN file

  // TODO:
  res.status(200).json({ status: "RANDOMIZED", data: [{}] });
});

export default router;
