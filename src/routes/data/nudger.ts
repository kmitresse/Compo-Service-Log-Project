import { Router, Request, Response } from "express";
import fileService from "../../services/fileService";

const router = Router();

router.get("/data/nudger", (req: Request, res: Response) => {
  fileService
    .downloadAndExtract("https://nudger.fr/opendata/gtin-open-data.zip")
    .then(() => {
      res.status(200).json({
        status: "SUCCESS",
        message: "Data nudger downloaded and extracted",
      });
    })
    .catch((error) => {
      res.status(500).json({ status: "ERROR", message: error.message });
    });
});

export default router;
