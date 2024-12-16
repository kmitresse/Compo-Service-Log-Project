import { Router, Request, Response } from "express";
import { DatasetCollection } from "../services/dataset";
import axios from "axios";

const router = Router();

router.post("/randomize", async (req: Request, res: Response) => {
  const size: number = req.query.size ? parseInt(req.query.size as string) : 10;

  const data = await Promise.all(
    DatasetCollection.datasets.map((dataset) =>
      axios
        .post(dataset.endpoint, req.body, { params: { size } })
        .then((res) => res.data.data)
    )
  ).then((r) =>
    r
      .flat()
      .sort(() => Math.random() - 0.5)
      .slice(0, size)
  );

  res.status(200).json({ status: "RANDOMIZED", data });
});

router.post("/randomize/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const size: number = req.query.size ? parseInt(req.query.size as string) : 10;

  const dataset = DatasetCollection.datasets.find(
    (dataset) => dataset.id === id
  );
  if (!dataset) return res.status(404).json({ status: "NOT_FOUND" });

  const data = await dataset.get(size, req.body);
  return res.status(200).json({ status: "RANDOMIZED", data });
});

export default router;
