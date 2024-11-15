const usermodel=require("../models/user");
const jwt=require("jsonwebtoken");

async function signinfunctionasync (req,res){
    const {email, password}=req.body;

    const founduser=await usermodel.matchpassword(email,password);
    
    if(!founduser){ console.log("password was incorrect"); return res.redirect("/blog/signin");}

    console.log(founduser);
    
    //adding token in cookie if the user is found
    const token=jwt.sign(founduser,"SR7thegoat");
    
    res.cookie("token", token);

    return res.redirect("/");
}

async function signupfunctionasync (req,res){
    const {fullname , email,password}=req.body;
    await usermodel.create({
        fullname,
        email,
        password
    });
    res.redirect("/blog/signin");
}

module.exports={
    signupfunctionasync,
    signinfunctionasync
}