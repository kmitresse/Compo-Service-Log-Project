import { Router, Request, Response } from "express";
import { DatasetCollection } from "../services/dataset";
import axios from "axios";

const router = Router();

router.post("/randomize", (req: Request, res: Response) => {
  const size: number = req.query.size ? parseInt(req.query.size as string) : 10;

  DatasetCollection.getDatasetByMatchingSchema(req.body)
    .then((endpoints) => {
      // Split evenly the size between the datasets
      const sizePerDataset = Math.floor(size / endpoints.length);

      return Promise.all(
        endpoints.map(async (endpoint) => {
          const params = { size: sizePerDataset };

          return axios
            .post(endpoint, req.body, { params })
            .then((res) => res.data.data);
        })
      );
    })
    .then((r) => {
      const data = r
        .flat()
        .sort(() => Math.random() - 0.5)
        .slice(0, size);

      res.status(200).json({ status: "RANDOMIZED", data });
    });
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

  const data = await dataset.get(size, req.body);
  return res.status(200).json({ status: "RANDOMIZED", data });
});

export default router;
