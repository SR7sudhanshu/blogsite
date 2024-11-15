const usermodel=require("../models/user");
const {createtokenforuser,checktoken}=require('../services/authentication')

async function signin (req,res){
    const {email, password}=req.body;

    const founduser=await usermodel.matchpassword(email,password);
    
    if(!founduser){ console.log("password was incorrect"); return res.redirect("/blog/signin");}

    console.log(founduser);
    
    //adding token in cookie if the user is found
    const token=createtokenforuser(founduser);
    res.cookie("token", token);

    return res.redirect("/");
}

async function signup (req,res){
    const {fullname,email,password}=req.body;
    await usermodel.create({
        fullname,
        email,
        password
    });
    res.redirect("/blog/signin");
}

module.exports={
    signin,
    signup
}