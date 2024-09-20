import { Router, Request, Response } from "express";
import fileService from "../../services/fileService";

const router = Router();

router.get("/data/openfoodfacts", (req: Request, res: Response) => {
  fileService
    .downloadAndExtract(
      "https://static.openfoodfacts.org/data/en.openfoodfacts.org.products.csv.gz"
    )
    .then(() => {
      res.status(200).json({
        status: "SUCCESS",
        message: "Data openfoodfacts downloaded and extracted",
      });
    })
    .catch((error) => {
      res.status(500).json({ status: "ERROR", message: error.message });
    });
});

export default router;
