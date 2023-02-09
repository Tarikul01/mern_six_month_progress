"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const folder_1 = __importDefault(require("./routes/folder"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/folder", folder_1.default);
app.use((err, req, res, next) => {
    res.status(200).json({ "msg": err.message });
});
mongoose_1.default.connect("mongodb://localhost:27017/folder", () => {
    console.log("Db connected");
});
app.listen(5000, () => {
    console.log("http://localhost:5000");
});
