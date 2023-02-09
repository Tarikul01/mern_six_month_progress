"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    name: String,
    slug: { type: String, index: true },
    parent: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: null,
        ref: 'Category'
    },
    ancestors: [{
            _id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Category",
                index: true
            },
            name: String,
            slug: String
        }]
});
const Category = mongoose_1.default.model("Category", CategorySchema);
exports.default = Category;
