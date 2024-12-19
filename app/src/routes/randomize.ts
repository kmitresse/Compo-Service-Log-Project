import { Router, Request, Response } from "express";
import { DatasetCollection } from "../services/dataset";
import axios from "axios";
import { Log } from "../entity/Log";
import { TypeOrmDataSource } from "../TypeOrmDataSource";

const router = Router();

router.all("/", (_: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    routes: ["/randomize", "/randomize/:id"],
  });
});

router.post("/randomize", async (req: Request, res: Response) => {
  const size: number = req.query.size ? parseInt(req.query.size as string) : 10;
  if (size < 1) return res.status(400).json({ status: "INVALID_SIZE" });
  let output: { status: string; data?: any[]; error?: any; };

  await Promise
    .all(
      DatasetCollection.datasets.map((dataset) =>
        axios.post(dataset.endpoint, req.body, { params: { size } })
             .then((res) => res.data.data),
      ),
    )
    .then((r) => r.flat()
                  .sort(() => Math.random() - 0.5)
                  .slice(0, size))
    .then((data) => {
      output = { status: "RANDOMIZED", data };
      res.status(200).json(output);
    })
    .catch(async (e) => {
      output = { status: "ERROR", error: e.message };
      const log: Log = new Log(
        req.url,
        req.method as any,
        JSON.stringify(req.body),
        JSON.stringify(output),
      );
      await TypeOrmDataSource.manager.save(log);

      return res.status(500).json(output);
    })
    .finally(() => {
      const log: Log = new Log(
        req.url,
        req.method as any,
        JSON.stringify(req.body),
        JSON.stringify(output),
      );
      TypeOrmDataSource.manager.save(log);
    });
});

router.post("/randomize/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const size: number = req.query.size ? parseInt(req.query.size as string) : 10;

  const dataset = DatasetCollection.datasets.find(
    (dataset) => dataset.id === id,
  );
  if (!dataset) return res.status(404).json({ status: "NOT_FOUND" });

  const data = await dataset.get(size, req.body);
  return res.status(200).json({ status: "RANDOMIZED", data });
});

export default router;
