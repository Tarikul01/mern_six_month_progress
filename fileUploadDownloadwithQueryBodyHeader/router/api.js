const express=require("express");
const { route } = require("../app");
const router=express.Router();
const { getData } = require("../controllers/queryHeaderBody");
const {uploadFile}=require("../controllers/uploadsFiles");
const {downloadFile}=require('../controllers/downloadFile');

const {uploadImg}=require("../middleware/upload");

// const queryHeaderBody=require('./controllers/queryHeaderBody')


router.post("/query",getData);
router.post("/upload",uploadImg,uploadFile);
router.get("/download",downloadFile);
// router.post("/upload",uploadFile);


module.exports=router;