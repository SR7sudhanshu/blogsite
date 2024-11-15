const express=require("express");
const router=express.Router();
const usermodel=require("../models/user");

const usercontroller=require("../controllers/user")

router.get("/signup",(req,res)=>{
    res.render("signuppage")
})

router.get("/signin",(req,res)=>{
    res.render("signinpage");
})

router.post("/signup",usercontroller.signup);

router.post("/signin",usercontroller.signin);

module.exports=router;