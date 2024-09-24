import { Router, Request, Response } from "express";

const router = Router();

router.get("/data/openfoodfacts", (req: Request, res: Response) => {
  res.status(501).send("Not yet implemented");
});

export default router;
