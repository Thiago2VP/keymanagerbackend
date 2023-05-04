import { Router } from "express";
import userController from "../controllers/User";

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

// router.get("/", userController.index);
// router.get("/:id", loginRequired, userController.show);

router.post("/", userController.store);
router.put("/", loginRequired, userController.update);
router.delete("/", loginRequired, userController.delete);

export default router;