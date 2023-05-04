import { Router } from "express";
import dBaseController from "../controllers/Dbase";

const router = new Router();

router.get("/", dBaseController.index);
router.get("/:id", dBaseController.search);
router.put("/:id", dBaseController.edit);
router.post("/", dBaseController.insert);
router.delete("/:id", dBaseController.delete);

export default router;