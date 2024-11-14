const express=require("express");
const router=express.Router();
const usermodel=require("../models/user");

router.get("/signup",(req,res)=>{
    res.render("signuppage")
})

router.get("/signip",(req,res)=>{
    res.render("signinpage");
})

router.post("/signup",async (req,res)=>{
    const {fullname , email,password}=req.body;
    await usermodel.create({
        fullname,
        email,
        password
    });
    res.redirect("/");
});

module.exports=router;