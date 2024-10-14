import { Router, Request, Response } from "express";
import { DatasetCollection } from "../services/dataset";
import { DMN } from "../services/dmn/DMN";
import { Definitions } from "../services/dmn/interfaces/";
import { Data } from "../services/data";

const router = Router();

router.post("/randomize", (req: Request, res: Response) => {
  const size: number = req.query.size
    ? parseInt(req.query.size as string)
    : 1000;

  const datasetID = DatasetCollection.datasets.map((dataset) => dataset.id);

  Promise.all(
    datasetID.map((id) => {
      const url: URL = new URL(`http://localhost:4321/randomize/${id}`);
      url.searchParams.append("size", size.toString());
      return fetch(url, {
        method: "POST",
        body: req.body,
        headers: { "Content-Type": "application/xml" },
      })
        .then((response) => response.json())
        .then((json: any) => json.data);
    })
  ).then((r) => {
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

  const dmn: Definitions = await DMN.parse(req.body);
  const schema = DMN.getSchema(dmn);

  const data: Data[] = await dataset.get(size, schema);

  // Randomize the data (temporary)
  data.sort(() => Math.random() - 0.5);

  return res.status(200).json({ status: "RANDOMIZED", data });
});

export default router;
