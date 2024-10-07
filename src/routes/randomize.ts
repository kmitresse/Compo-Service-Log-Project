import { Router, Request, Response } from "express";
import { DatasetCollection } from "../services/dataset";
import { DMN } from "../services/dmn/DMN";
import { Definitions } from "../services/dmn/interfaces/";
import { Data } from "../services/data";

const router = Router();

router.post("/randomize", (req: Request, res: Response) => {
  res.status(200).json({ status: "RANDOMIZED", data: [{}] });
});

router.post("/randomize/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const size: number | undefined = req.query.size
    ? parseInt(req.query.size as string)
    : undefined;

  const dataset = DatasetCollection.datasets.find(
    (dataset) => dataset.id === id
  );
  if (!dataset) return res.status(404).json({ status: "NOT_FOUND" });

  const dmn: Definitions = await DMN.parse(req.body);
  const schema = DMN.getSchema(dmn);

  const data: Data[] = await dataset.get(size, schema);

  // Randomize the data (temporary)
  data.sort(() => Math.random() - 0.5);

  return res.status(200).json({ status: "RANDOMIZED", data });
});

export default router;
