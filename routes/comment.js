const express=require("express");
const router=express.Router();
const commentmodel=require("../models/comment");

router.get("/",async(req,res)=>{
    const {body}=req.body;
    await commentmodel.create({
        body,
        createdby : req.user._id,
        commenton : 
    })
})


module.exports=router;