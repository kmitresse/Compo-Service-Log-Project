import { Router, Request, Response } from "express";
import { Dataset, DatasetCollection } from "../services/dataset";
import { Data } from "../services/data";
import DmnModdle from "dmn-moddle";
import { DMN } from "../services/dmn/DMN";

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

  const a = await DMN.parse(req.body);

  const { rootElement, warnings } = await new DmnModdle().fromXML(req.body);
  console.log(rootElement);

  const data = await dataset.get(size);

  return res.status(200).json({ status: "RANDOMIZED", data, a });
});

export default router;
