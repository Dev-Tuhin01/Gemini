import { Router } from "express";
import multer from "multer";

import health from "../controller/health.ts";
import compression from "../controller/compress.ts";

const router = Router();
const upload = multer({dest: "uploads/"});

router.get("/health",health);
router.post("/compress",upload.single("image"),compression)

export default router;
