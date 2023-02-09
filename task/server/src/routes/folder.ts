import {Router}  from "express";

import { categoryFolder, createFolder } from "../controllers/folderController";

const router=Router();



router.post("/",createFolder);
router.post("/category",categoryFolder);

export default router;