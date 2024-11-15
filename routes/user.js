const express=require("express");
const router=express.Router();
const usermodel=require("../models/user");

const {signinfunctionasync,signupfunctionasync}=require("../controllers/user")

router.get("/signup",(req,res)=>{
    res.render("signuppage")
})

router.get("/signin",(req,res)=>{
    res.render("signinpage");
})

router.post("/signup",signupfunctionasync);

router.post("/signin",signinfunctionasync);

module.exports=router;