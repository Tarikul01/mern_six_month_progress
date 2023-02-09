"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryFolder = exports.createFolder = void 0;
const folderModel_1 = __importDefault(require("../models/folderModel"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const createFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    const folder = yield folderModel_1.default.create(data);
    return res.status(200).json({ "status": "success", "data": folder });
});
exports.createFolder = createFolder;
const categoryFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = new categoryModel_1.default({ name: req.body.name });
    try {
        let newCategory = yield category.save();
        res.status(201).send({ response: `Category ${newCategory._id}` });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.categoryFolder = categoryFolder;
