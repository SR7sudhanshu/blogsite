const express=require("express");
const router=express.Router();
const usermodel=require("../models/user");
const multer=require('multer');

router.get("/profile",(req,res)=>{
    return res.render("viewprofile",{
        user : req.user,
    });
})


module.exports=router;