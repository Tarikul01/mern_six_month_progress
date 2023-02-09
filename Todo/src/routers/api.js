const express=require("express");
const LoginController= require("../controllers/LogController");
const ProfileController= require("../controllers/ProfileController");
const TodoListController=require("../controllers/TodoListController")
const AuthVerifiedMiddleware = require("../middleware/AuthVerifieMiddleware");

 const router=express.Router();

router.post("/CreateProfile",ProfileController.CreateProfile);
router.post("/Login",LoginController.Login);


router.get("/SelectProfile",AuthVerifiedMiddleware,ProfileController.SelectProfile);
router.post("/UpdateProfile",AuthVerifiedMiddleware,ProfileController.UpdateProfile);


router.post("/CreateTodo",AuthVerifiedMiddleware,TodoListController.CreateTodo);
router.get("/SelectTodo",AuthVerifiedMiddleware,TodoListController.SelectTodo);
router.post("/UpateTodo",AuthVerifiedMiddleware,TodoListController.UpdateTodo);
router.post("/UpdateStatus",AuthVerifiedMiddleware,TodoListController.UpdateStatus);
router.post("/DeleteTodo",AuthVerifiedMiddleware,TodoListController.DeleteTodo);
router.post("/SelectToDoByStatus",AuthVerifiedMiddleware,TodoListController.SelectToDoByStatus);
router.get("/SelectToDoByDate",AuthVerifiedMiddleware,TodoListController.SelectToDoByDate);



 module.exports=router;