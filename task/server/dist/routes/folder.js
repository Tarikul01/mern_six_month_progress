"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const folderController_1 = require("../controllers/folderController");
const router = (0, express_1.Router)();
router.post("/", folderController_1.createFolder);
router.post("/category", folderController_1.categoryFolder);
exports.default = router;
