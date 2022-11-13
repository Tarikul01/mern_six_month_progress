const express=require("express")
const router=express.Router();
const {controllers}=require("../controllers/auth/authControlers");
const auth=require("../middlewares/auth");
const joi=require("joi");


const schema=require("../utils/validateSchema")
const validateMiddleware=require("../middlewares/auth/validateMiddlware")






// router.post("/login",validator.body(loginSchema),controllers.postLogin)



router.post("/login",validateMiddleware(schema.loginSchema,"body"),controllers.postLogin)
router.post("/register",validateMiddleware(schema.registerSchema,"body"),controllers.postRegister)
router.post("/passwordUpdate/:userId",controllers.passwordUpdate)


// Test router 
router.get("/test",auth,(req,res)=>{
    res.send("Request passsed");
})

// Wrong Router url
router.get('*', (req, res) => {
	res.status(404).json({ msg: "URL doen't match! " });
});



module.exports=router;